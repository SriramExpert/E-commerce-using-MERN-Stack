import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import Department from '../models/departmentModel.js';
import { deleteFile } from '../utils/file.js';

// @desc Fetch All Products with filtering
// @method GET
// @endpoint /api/v1/products
// @access Public
const getProducts = async (req, res, next) => {
  try {
    const {
      limit = 20,
      page = 1,
      search = '',
      category,
      department,
      brand,
      minPrice,
      maxPrice,
      requiresPrescription,
      inStock,
      sort = 'name'
    } = req.query;

    // Build filter object
    const filter = {};

    // Search by name, generic name, or tags
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { genericName: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by department
    if (department) {
      const dept = await Department.findById(department);
      if (dept) {
        filter.category = { $in: dept.categories };
      }
    }

    // Filter by brand
    if (brand) {
      filter.brand = brand;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Prescription requirement filter
    if (requiresPrescription !== undefined) {
      filter.requiresPrescription = requiresPrescription === 'true';
    }

    // Stock availability filter
    if (inStock === 'true') {
      filter.stock = { $gt: 0 };
    } else if (inStock === 'false') {
      filter.stock = 0;
    }

    // Calculate pagination
    const pageNumber = Math.max(1, parseInt(page));
    const pageSize = Math.min(parseInt(limit), 100);
    const skip = (pageNumber - 1) * pageSize;

    // Get total count
    const total = await Product.countDocuments(filter);

    // Determine sort order
    let sortOption = {};
    switch (sort) {
      case 'price_asc':
        sortOption = { price: 1 };
        break;
      case 'price_desc':
        sortOption = { price: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'popular':
        sortOption = { rating: -1 };
        break;
      default:
        sortOption = { name: 1 };
    }

    // Execute query
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize)
      .select('-__v');

    if (!products || products.length === 0) {
      res.statusCode = 404;
      throw new Error('No products found!');
    }

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      products
    });

  } catch (error) {
    next(error);
  }
};

// @desc Fetch All Departments with Categories
// @method GET
// @endpoint /api/v1/products/departments
// @access Public
const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find({ isActive: true })
      .sort({ order: 1 })
      .select('-__v');

    if (!departments || departments.length === 0) {
      res.statusCode = 404;
      throw new Error('No departments found!');
    }

    res.status(200).json({
      success: true,
      count: departments.length,
      departments
    });

  } catch (error) {
    next(error);
  }
};

// @desc Fetch Products by Department
// @method GET
// @endpoint /api/v1/products/department/:departmentId
// @access Public
const getProductsByDepartment = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    const { limit = 20, page = 1 } = req.query;

    // Find department
    const department = await Department.findById(departmentId);
    if (!department) {
      res.statusCode = 404;
      throw new Error('Department not found!');
    }

    // Calculate pagination
    const pageNumber = Math.max(1, parseInt(page));
    const pageSize = Math.min(parseInt(limit), 100);
    const skip = (pageNumber - 1) * pageSize;

    // Get products by department categories
    const filter = {
      category: { $in: department.categories },
      isActive: true
    };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(pageSize)
      .select('-__v');

    res.status(200).json({
      success: true,
      department: {
        id: department._id,
        name: department.name,
        icon: department.icon
      },
      count: products.length,
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      products
    });

  } catch (error) {
    next(error);
  }
};

// @desc Fetch Products by Category
// @method GET
// @endpoint /api/v1/products/category/:categoryName
// @access Public
const getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const { limit = 20, page = 1, sort = 'name' } = req.query;

    // Decode URL category name
    const decodedCategory = decodeURIComponent(categoryName);

    // Calculate pagination
    const pageNumber = Math.max(1, parseInt(page));
    const pageSize = Math.min(parseInt(limit), 100);
    const skip = (pageNumber - 1) * pageSize;

    // Determine sort order
    let sortOption = {};
    switch (sort) {
      case 'price_asc':
        sortOption = { price: 1 };
        break;
      case 'price_desc':
        sortOption = { price: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'popular':
        sortOption = { rating: -1 };
        break;
      default:
        sortOption = { name: 1 };
    }

    const filter = {
      category: decodedCategory,
      isActive: true
    };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize)
      .select('-__v');

    if (!products || products.length === 0) {
      res.statusCode = 404;
      throw new Error(`No products found in category: ${decodedCategory}`);
    }

    res.status(200).json({
      success: true,
      category: decodedCategory,
      count: products.length,
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      products
    });

  } catch (error) {
    next(error);
  }
};

// @desc Fetch Top Products
// @method GET
// @endpoint /api/v1/products/top
// @access Public
const getTopProducts = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const products = await Product.find({ isActive: true, stock: { $gt: 0 } })
      .sort({ rating: -1, soldCount: -1 })
      .limit(parseInt(limit))
      .select('name price rating image brand category stock');

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    next(error);
  }
};

// @desc Fetch Top Products by Department
// @method GET
// @endpoint /api/v1/products/top/:departmentId
// @access Public
const getTopProductsByDepartment = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    const { limit = 5 } = req.query;

    const department = await Department.findById(departmentId);
    if (!department) {
      res.statusCode = 404;
      throw new Error('Department not found!');
    }

    const products = await Product.find({
      category: { $in: department.categories },
      isActive: true,
      stock: { $gt: 0 }
    })
      .sort({ rating: -1, soldCount: -1 })
      .limit(parseInt(limit))
      .select('name price rating image brand category stock');

    res.status(200).json({
      success: true,
      department: department.name,
      count: products.length,
      products
    });

  } catch (error) {
    next(error);
  }
};

// @desc Fetch Single Product
// @method GET
// @endpoint /api/v1/products/:id
// @access Public
const getProduct = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId)
      .populate('reviews.user', 'name')
      .select('-__v');

    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {
    next(error);
  }
};

// @desc Get Related Products
// @method GET
// @endpoint /api/v1/products/:id/related
// @access Public
const getRelatedProducts = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const { limit = 4 } = req.query;

    const product = await Product.findById(productId);
    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }

    const relatedProducts = await Product.find({
      _id: { $ne: productId },
      $or: [
        { category: product.category },
        { brand: product.brand },
        { tags: { $in: product.tags } }
      ],
      isActive: true,
      stock: { $gt: 0 }
    })
      .limit(parseInt(limit))
      .select('name price image brand category stock rating');

    res.status(200).json({
      success: true,
      count: relatedProducts.length,
      relatedProducts
    });

  } catch (error) {
    next(error);
  }
};

// @desc Create Product
// @method POST
// @endpoint /api/v1/products
// @access Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      genericName,
      brand,
      category,
      type,
      strength,
      description,
      price,
      discountPrice,
      stock,
      minStock,
      requiresPrescription,
      expiryDate,
      manufacturer,
      composition,
      sideEffects,
      dosage,
      tags
    } = req.body;

    // Check if product already exists
    const existingProduct = await Product.findOne({ 
      name, 
      genericName,
      strength 
    });

    if (existingProduct) {
      res.statusCode = 400;
      throw new Error('Product with same name, generic name and strength already exists');
    }

    // Create new product
    const product = new Product({
      name,
      genericName: genericName || name,
      brand,
      category,
      type: type || 'tablet',
      strength: strength || 'N/A',
      description,
      price,
      discountPrice: discountPrice || price,
      stock: stock || 0,
      minStock: minStock || 10,
      images: req.files ? req.files.map(file => file.path) : [],
      requiresPrescription: requiresPrescription || false,
      expiryDate: expiryDate || null,
      manufacturer: manufacturer || 'Unknown',
      composition: composition || [],
      sideEffects: sideEffects || [],
      dosage: dosage || 'As directed by physician',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      isActive: true
    });

    const createdProduct = await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: createdProduct
    });

  } catch (error) {
    next(error);
  }
};

// @desc Update Product
// @method PUT
// @endpoint /api/v1/products/:id
// @access Private/Admin
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }

    // Save current images before updating
    const previousImages = [...product.images];

    // Update product fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && req.body[key] !== null) {
        if (key === 'tags' && typeof req.body[key] === 'string') {
          product[key] = req.body[key].split(',').map(tag => tag.trim());
        } else if (key === 'composition' || key === 'sideEffects') {
          product[key] = req.body[key];
        } else {
          product[key] = req.body[key];
        }
      }
    });

    // Handle new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      product.images = [...product.images, ...newImages];
    }

    const updatedProduct = await product.save();

    // Delete old images if they were removed
    if (req.body.removedImages) {
      const removedImages = JSON.parse(req.body.removedImages);
      removedImages.forEach(imagePath => {
        if (previousImages.includes(imagePath)) {
          deleteFile(imagePath);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    next(error);
  }
};

// @desc Delete Product
// @method DELETE
// @endpoint /api/v1/products/:id
// @access Admin
const deleteProduct = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }

    // Delete associated images
    if (product.images && product.images.length > 0) {
      product.images.forEach(image => {
        deleteFile(image);
      });
    }

    await Product.deleteOne({ _id: product._id });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

// @desc Create Product Review
// @method POST
// @endpoint /api/v1/products/:id/reviews
// @access Private
const createProductReview = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.statusCode = 400;
      throw new Error('Product already reviewed by this user');
    }

    // Add review
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully'
    });

  } catch (error) {
    next(error);
  }
};

// @desc Search Products Autocomplete
// @method GET
// @endpoint /api/v1/products/search/autocomplete
// @access Public
const getSearchAutocomplete = async (req, res, next) => {
  try {
    const { query = '', limit = 10 } = req.query;

    if (!query || query.length < 2) {
      return res.status(200).json({
        success: true,
        suggestions: []
      });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { genericName: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ],
      isActive: true,
      stock: { $gt: 0 }
    })
      .limit(parseInt(limit))
      .select('name genericName brand category price image stock');

    const suggestions = products.map(product => ({
      id: product._id,
      name: product.name,
      genericName: product.genericName,
      brand: product.brand,
      category: product.category,
      price: product.price,
      image: product.images[0],
      inStock: product.stock > 0
    }));

    res.status(200).json({
      success: true,
      suggestions
    });

  } catch (error) {
    next(error);
  }
};

// @desc Update Product Stock
// @method PATCH
// @endpoint /api/v1/products/:id/stock
// @access Private/Admin
const updateProductStock = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const { stock, action = 'set' } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }

    if (action === 'increment') {
      product.stock += Number(stock);
    } else if (action === 'decrement') {
      product.stock = Math.max(0, product.stock - Number(stock));
    } else {
      product.stock = Number(stock);
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      stock: product.stock
    });

  } catch (error) {
    next(error);
  }
};

// @desc Get Low Stock Products
// @method GET
// @endpoint /api/v1/products/low-stock
// @access Private/Admin
const getLowStockProducts = async (req, res, next) => {
  try {
    const { limit = 50 } = req.query;

    const products = await Product.find({
      stock: { $lt: '$minStock' },
      isActive: true
    })
      .sort({ stock: 1 })
      .limit(parseInt(limit))
      .select('name stock minStock price category');

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getDepartments,
  getProductsByDepartment,
  getProductsByCategory,
  getTopProducts,
  getTopProductsByDepartment,
  getProduct,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getSearchAutocomplete,
  updateProductStock,
  getLowStockProducts
};