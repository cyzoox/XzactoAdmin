import { ObjectId } from "bson";

class Stores {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    branch,
    owner,
    password,
    id,
    attendant,
    attendant_id,
    store_type
    
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.branch = branch;
    this.owner = owner;
    this.password = password;
    this.attendant = attendant;
    this.attendant_id = attendant_id;
    this.store_type = store_type;
  }

  
  static schema = {
    name: "Stores",
    properties: {
      _id: "string",
      _partition: "string",
      name: "string",
      branch: "string",
      owner: "string?",
      password: "string",
      attendant: "string",
      attendant_id: "string",
      store_type: "string"
    },
    primaryKey: "_id",
  };
}

class SupplierWarehouse {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    contact,
    address,
    owner_id,
    name
    
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.contact = contact;
    this.address = address;
    this.owner_id = owner_id;
  }

  
  static schema = {
    name: "SupplierWarehouse",
    properties: {
      _id: "string",
      _partition: "string",
      name: "string",
      contact: "string",
      address: "string",
      owner_id: "string",
      
    },
    primaryKey: "_id",
  };
}

class List {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    brand,
    oprice,
    sprice,
    unit,
    category,
    store_id,
    store,
    quantity,
    id
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.brand = brand;
    this.oprice = oprice;
    this.sprice = sprice;
    this.unit = unit;
    this.category = category;
    this.store_id = store_id;
    this.store = store;
    this.quantity = quantity;
  }

  
  static schema = {
    name: "List",
    properties: {
      _id: "string?",
      _partition: "string?",
      uid: 'string',
      name: "string",
      brand: "string",
      oprice: "int",
      sprice: "int",
      unit: "string",
      category: "string",
      store_id: "string",
      store: "string",
      quantity: "int"
    },
    primaryKey: "_id",
  };
}

class WarehouseProducts {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    brand,
    oprice,
    sprice,
    unit,
    category,
    owner_id,
    stock,
    id,
    sku,
    img,
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.brand = brand;
    this.oprice = oprice;
    this.sprice = sprice;
    this.unit = unit;
    this.category = category;
    this.owner_id = owner_id;
    this.stock = stock;
    this.sku = sku;
    this.img = img
  }

  
  static schema = {
    name: "WarehouseProducts",
    properties: {
      _id: "string",
      _partition: "string",
      name: "string",
      brand: "string",
      oprice: "float",
      sprice: "float",
      unit: "string",
      category: "string",
      owner_id: "string",
      stock: "float",
      sku: 'string',
      img: 'string'
    },
    primaryKey: "_id",
  };
}

class Products {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    brand,
    oprice,
    sprice,
    unit,
    category,
    store_id,
    store,
    stock,
    id, 
    sku,
    img,
    pr_id,
    withAddons,
    withVariants,
    withOptions,
    addons,
    variants,
    options,

  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.brand = brand;
    this.oprice = oprice;
    this.sprice = sprice;
    this.unit = unit;
    this.category = category;
    this.store_id = store_id;
    this.store = store;
    this.stock = stock;
    this.sku = sku;
    this.img = img;
    this.pr_id = pr_id;
    this.withAddons = withAddons;
    this.withVariants = withVariants;
    this.withOptions = withOptions;
    this.addons = addons;
    this.variants = variants;
    this.options = options;
  }

  
  static schema = {
    name: "Products",
    properties: {
      _id: "string?",
      _partition: "string?",
      uid: 'string',
      name: "string",
      brand: "string",
      oprice: "int",
      sprice: "int",
      unit: "string",
      category: "string",
      store_id: "string",
      store: "string",
      stock: "int",
      sku: "string",
      img: "string",
      pr_id: "string",
      withAddons: "bool",
      withVariants: "bool",
      withOptions: "bool",
      addons:{
        name: 'Addons',
        properties:{
          name: "string",
          price: "float",
          cost: "float"
        }
      },
      variants:{
        name: 'Variants',
        properties:{
          name: "string",
          price: "float",
          cost: "float"
        }
      },
      options:{
        name: 'Options',
        properties:{
          option: "string"
        }
      },
    },
    primaryKey: "_id",
  };
}


class ExpiredWarehouse {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    date,
    id,
    owner_id,
    timeStamp,
    product,
    brand,
    year_month,
    year_week,
    quantity,
    sprice,
    oprice,
    year,
    processed_by,
    exp_date,
    

  }) {
    this._partition = partition;
    this._id = id;
    this.date = date;
    this.owner_id = owner_id;
    this.timeStamp = timeStamp;
    this.product = product;
    this.year_month = year_month;
    this.year_week = year_week;
    this.quantity = quantity;
    this.sprice = sprice;
    this.oprice = oprice;
    this.brand = brand;
    this.year = year;
    this.processed_by = processed_by;
    this.exp_date = exp_date;
   
  }

  
  static schema = {
    name: "ExpiredWarehouse",
    properties: {
      _id: "string?",
      _partition: "string?",
      owner_id: 'string',
      date: 'string',
      timeStamp: 'int',
      product_name: 'string',
      product_id: 'string',
      year_month: 'string',
      year_week: 'string',
      year: 'string',
      quantity: 'string',
      sprice: 'int',
      oprice: 'int',
      brand: 'string',
      exp_date: 'string'
    },
    primaryKey: "_id",
  };
}

                                      
class PulloutWarehouse {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    date,
    id,
    owner_id,
    timeStamp,
    product,
    brand,
    year_month,
    year_week,
    quantity,
    sprice,
    oprice,
    year,
    processed_by,
    pullout_by,
    reason

  }) {
    this._partition = partition;
    this._id = id;
    this.date = date;
    this.owner_id = owner_id;
    this.timeStamp = timeStamp;
    this.product = product;
    this.year_month = year_month;
    this.year_week = year_week;
    this.quantity = quantity;
    this.sprice = sprice;
    this.oprice = oprice;
    this.brand = brand;
    this.year = year;
    this.processed_by = processed_by;
    this.pullout_by = pullout_by;
    this.reason = reason
  }

  
  static schema = {
    name: "PulloutWarehouse",
    properties: {
      _id: "string",
      _partition: "string",
      owner_id: 'string',
      date: 'string',
      timeStamp: 'int',
      product_name: 'string',
      product_id: 'string',
      year_month: 'string',
      year_week: 'string',
      year: 'string',
      quantity: 'float',
      sprice: 'float',
      oprice: 'float',
      brand: 'string',
      pullout_by: 'string',
      reason: 'string',
    },
    primaryKey: "_id",
  };
}


class BOWarehouse {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    date,
    id,
    owner_id,
    timeStamp,
    product_name,
    product_id,
    year_month,
    year_week,
    quantity,
    sprice,
    oprice,
    brand,
    total,
    year

  }) {
    this._partition = partition;
    this._id = id;
    this.date = date;
    this.owner_id = owner_id;
    this.timeStamp = timeStamp;
    this.product_name = product_name;
    this.product_id = product_id;
    this.year_month = year_month;
    this.year_week = year_week;
    this.quantity = quantity;
    this.sprice = sprice;
    this.oprice = oprice;
    this.brand = brand;
    this.total = total;
    this.year = year;
  }

  
  static schema = {
    name: "BOWarehouse",
    properties: {
      _id: "string",
      _partition: "string",
      owner_id: 'string',
      date: 'string',
      timeStamp: 'int',
      product_name: 'string',
      product_id: 'string',
      year_month: 'string',
      year_week: 'string',
      year: 'string',
      quantity: 'float',
      sprice: 'float',
      oprice: 'float',
      brand: 'string',
      total: 'float',
    },
    primaryKey: "_id",
  };
}

class BO {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    id,
    store_name,
    store_id,
    date,
    timeStamp,
    product_name,
    product_id,
    total,
    year,
    year_month,
    year_week,
    attendant_name,
    attendant_id,
    quantity,
    sprice,
    oprice,
    brand,
   

  }) {
    this._partition = partition;
    this._id = id;
    this.store_name = store_name;
    this.store_id = store_id;
    this.date = date;
    this.timeStamp = timeStamp;
    this.product_name = product_name;
    this.product_id = product_id;
    this.total = total;
    this.year = year;
    this.year_month = year_month;
    this.year_week = year_week;
    this.attendant_name = attendant_name;
    this.attendant_id = attendant_id;
    this.quantity = quantity;
    this.sprice = sprice;
    this.oprice = oprice;
    this.brand = brand;    
  }

  
  static schema = {
    name: "BO",
    properties: {
      _id: "string?",
      _partition: "string?",
      store_name: 'string',
      store_id: 'string',
      date: 'string',
      timeStamp: 'int',
      product_name: 'string',
      product_id: 'string',
      total: 'int',
      year: 'string',
      year_month: 'string',
      year_week: 'string',
      attendant_name: 'string',
      attendant_id: 'string',
      quantity: 'string',
      sprice: 'int',
      oprice: 'int',
      brand: 'string',
    },
    primaryKey: "_id",
  };
}

class CategoriesWarehouse {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    name,
    id,
    owner_id
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.owner_id = owner_id;
  }

  
  static schema = {
    name: "CategoriesWarehouse",
    properties: {
      _id: "string",
      _partition: "string",
      owner_id: 'string',
      name: 'string',

    },
    primaryKey: "_id",
  };
}

class Categories {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    category,
    partition,
    name,
    id,
    store_id
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.category = category;
    this.store_id = store_id;
  }

  
  static schema = {
    name: "Categories",
    properties: {
      _id: "string",
      _partition: "string",
      store_id: 'string',
      name: 'string',

    },
    primaryKey: "_id",
  };
}

class Expenses {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    description,
    partition,
    store_id,
    category,
    date,
    attendant,
    attendant_id,
    amount,
    id,
    timeStamp,
    year,
    year_month,
    year_week
  }) {
    this._partition = partition;
    this._id = id;
    this.description = description;
    this.store_id = store_id;
    this.category = category;
    this.date = date;
    this.attendant = attendant;
    this.attendant_id = attendant_id;
    this.amount = amount;
    this.timeStamp = timeStamp,
    this.year = year,
    this.year_month = year_month,
    this.year_week = year_week
  }

  

  
  static schema = {
    name: "Expenses",
    properties: {
      _id: "string",
      _partition: "string",
      uid: 'string',
      timeStamp: 'int',
      description: "string",
      store_id: "string",
      category: "string",
      date: 'string',
      attendant: "string",
      attendant_id: "string",
      amount: "float",
    },
    primaryKey: "_id",
  };
}

class Settings {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    store_id,
    store_name,
    allow_credit,
    id
  }) {
    this._partition = partition;
    this._id = id;
    this.store_name = store_name;
    this.store_id = store_id;
    this.allow_credit = allow_credit;
  }

  static schema = {
    name: "Settings",
    properties: {
      _id: "string",
      _partition: "string",
      allow_credit: 'bool',
      store_name: "string",
      store_id: "string",
    },
    primaryKey: "_id",
  };
}

class Customers {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    address,
    partition,
    credit_balance,
    mobile_no,
    name,
    store,
    store_id,
    tel_no,
    id

  }) {
    this._partition = partition;
    this._id = id;
    this.address = address;
    this.store_id = store_id;
    this.credit_balance = credit_balance;
    this.mobile_no = mobile_no;
    this.name = name;
    this.store = store;
    this.tel_no = tel_no;
  }

  
  static schema = {
    name: "Customers",
    properties: {
      _id: "string",
      _partition: "string",
      uid: 'string',
      address: "string?",
      store_id: "string",
      credit_balance: "float?",
      mobile_no: 'string?',
      name: "string",
      store: "string",
      tel_no: "string?",
    },
    primaryKey: "_id",
  };
}


class DeliveryReport {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    date,
    year,
    year_week,
    year_month,
    timeStamp,
    product,
    quantity,
    sprice,
    oprice,
    supplier,
    supplier_id,
    delivered_by,
    received_by,
    delivery_receipt,
    store_id,
    store_name

  }) {
    this._id = id,
    this._partition = partition,
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.product = product,
    this.quantity = quantity,
    this.sprice = sprice,
    this.oprice = oprice,
    this.supplier = supplier,
    this.supplier_id = supplier_id,
    this.delivered_by = delivered_by,
    this.received_by = received_by,
    this.delivery_receipt = delivery_receipt,
    this.store_id = store_id,
    this.store_name = store_name
  }

  static schema = {
    name: "DeliveryReport",
    properties: {
      _id: "string",
      _partition: "string",
      date: "string",
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      product: "string",
      quantity: "float",
      sprice: "float",
      oprice: "float",
      supplier: "string",
      supplier_id: "string",
      delivered_by: "string",
      received_by: "string",
      delivery_receipt: "string",
      store_name: "string",
      store_id: "string"
    },
    primaryKey: "_id",
  };
}


class DeliveryReportWarehouse {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    date,
    year,
    year_week,
    year_month,
    timeStamp,
    product,
    quantity,
    sprice,
    oprice,
    supplier,
    supplier_id,
    delivered_by,
    received_by,
    delivery_receipt,
    brand,
    type,
    owner_id

  }) {
    this._id = id,
    this._partition = partition,
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.product = product,
    this.quantity = quantity,
    this.sprice = sprice,
    this.oprice = oprice,
    this.supplier = supplier,
    this.supplier_id = supplier_id,
    this.delivered_by = delivered_by,
    this.received_by = received_by,
    this.delivery_receipt = delivery_receipt,
    this.brand = brand,
    this.type = type,
    this.owner_id = owner_id
  }

  
  static schema = {
    name: "DeliveryReportWarehouse",
    properties: {
      _id: "string",
      _partition: "string",
      date: "string",
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      product: "string",
      quantity: "float",
      sprice: "float",
      oprice: "float",
      supplier: "string",
      supplier_id: "string",
      delivered_by: "string",
      received_by: "string",
      delivery_receipt: "string",
      brand: "string",
      type: "string",
      owner_id: "string"
    },
    primaryKey: "_id",
  };
}

class DeliveryReportSummary {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    date,
    year,
    year_week,
    year_month,
    timeStamp,
    supplier,
    supplier_id,
    delivered_by,
    received_by,
    delivery_receipt,
    total
  }) {
    this._id = id,
    this._partition = partition,
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.supplier = supplier,
    this.supplier_id = supplier_id,
    this.delivered_by = delivered_by,
    this.received_by = received_by,
    this.delivery_receipt = delivery_receipt,
    this.total = total

  }
  

  
  static schema = {
    name: "DeliveryReportSummary",
    properties: {
      _id: "string",
      _partition: "string",
      date: "string",
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      supplier: "string",
      supplier_id: "string",
      delivered_by: "string",
      received_by: "string",
      delivery_receipt: "string",
      total: "float",
  
    },
    primaryKey: "_id",
  };
}

class DeliveryStoreSummary {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    date,
    year,
    year_week,
    year_month,
    timeStamp,
    supplier,
    supplier_id,
    delivered_by,
    received_by,
    delivery_receipt,
    total,
    store_name,
      store_id
  }) {
    this._id = id,
    this._partition = partition,
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.supplier = supplier,
    this.supplier_id = supplier_id,
    this.delivered_by = delivered_by,
    this.received_by = received_by,
    this.delivery_receipt = delivery_receipt,
    this.total = total,
    this.store_name = store_name,
    this.store_id = store_id
  }
  

  
  static schema = {
    name: "DeliveryStoreSummary",
    properties: {
      _id: "string",
      _partition: "string",
      date: "string",
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      supplier: "string",
      supplier_id: "string",
      delivered_by: "string",
      received_by: "string",
      delivery_receipt: "string",
      total: "float",
      store_name: "string",
      store_id: "string",
    },
    primaryKey: "_id",
  };
}

class Staffs {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    password,
    partition,
    login_am,
    login_pm,
    name,
    store,
    store_id,
    logout_am,
    logout_pm,
    id,
    status
  }) {
    this._partition = partition;
    this._id = id;
    this.login_am = login_am;
    this.store_id = store_id;
    this.login_pm = login_pm;
    this.logout_am = logout_am;
    this.name = name;
    this.store = store;
    this.logout_pm = logout_pm;
    this.password = password;
    this.status = status;
  }

  
  static schema = {
    name: "Staffs",
    properties: {
      _id: "string",
      _partition: "string",
      uid: 'string',
      password: "string",
      store_id: "string",
      login_am: "string?",
      login_pm: 'string?',
      name: "string",
      store: "string",
      logout_pm: "string?",
      logout_am: "string?",
      status: "string"
    },
    primaryKey: "_id",
  };
}

class Pullout {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    reason,
    date,
    year,
    year_week,
    year_month,
    timeStamp,
    product,
    quantity,
    oprice,
    sprice,
    brand,
    pullout_by,
    attendant,
    attendant_id,
    store,
    store_id
  }) {
    this._partition = partition;
    this._id = id;
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.product = product,
    this.quantity = quantity,
    this.sprice = sprice,
    this.oprice = oprice,
    this.store_id = store_id,
    this.brand = brand,
    this.attendant = attendant,
    this.attendant_id = attendant_id,
    this.store = store,
    this.reason =reason,
    this.pullout_by = pullout_by

  }
  static schema = {
    name: "Pullout",
    properties: {
      _id: "string",
      _partition: "string",
      date: "string",
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      product: "string",
      quantity: "int",
      sprice: "int",
      oprice: "int",
      brand: "string",
      pullout_by: "string",
      store_id: "string",
      attendant: "string",
      attendant_id: "string",
      store: "string",
      reason: "string"
    },
    primaryKey: "_id",
  };
}


class Returned {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    store_name,
    store_id,
    date,
    timeStamp,
    product_name,
    product_id,
    total,
    year,
    year_week,
    year_month,
    attendant_name,
    attendant_id,
    quantity,
    reason,
    receipt_no
  }) {
    this._partition = partition;
    this._id = id;
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.product_id = product_id,
    this.store_id = store_id,
    this.attendant_name = attendant_name,
    this.attendant_id = attendant_id,
    this.store_name =store_name,
    this.product_name = product_name,
    this.quantity = quantity,
    this.total = total,
    this.reason = reason,
    this.receipt_no = receipt_no
  }
  static schema = {
    name: "Returned",
    properties: {
      _id: "string?",
      _partition: "string?",
      date: "string",  
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      product_id: "string",
      store_id: "string",
      attendant_name: "string",
      attendant_id: "string",
      store_name: "string",
      product_name: "string",
      quantity: "int",
      total: "int",
      reason: "string",
      receipt_no: "string"

    },
    primaryKey: "_id",
  };
}

class Discount {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    transaction_id,
    discount_total,
    attendant,
    attendant_id,
    store,
    store_id,
    date,
    year,
    year_week,
    year_month,
    timeStamp,
    customer_name,
    customer_id

  }) {
    this._partition = partition;
    this._id = id;
    this.transaction_id =transaction_id;
    this.discount_total = discount_total;
    this.attendant = attendant,
    this.attendant_id = attendant_id,
    this.store_id = store_id,
    this.store = store
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.customer_name = customer_name,
    this.customer_id = customer_id

  }

  
  static schema = {
    name: "Discount",
    properties: {
      _id: "string?",
      _partition: "string?",
      transaction_id: "string", 
      discount_total: "int", 
      attendant: "string",
      attendant_id: "string",
      store_id: "string",  
      store: "string",
      date: "string",
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      customer_name: "string", 
      customer_id: "string", 
 
    },
    primaryKey: "_id",
  };
}


class Expired {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    exp_date,
    date,
    year,
    year_week,
    year_month,
    timeStamp,
    product,
    quantity,
    oprice,
    sprice,
    brand,
    attendant,
    attendant_id,
    store,
    store_id
  }) {
    this._partition = partition;
    this._id = id;
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.product = product,
    this.quantity = quantity,
    this.sprice = sprice,
    this.oprice = oprice,
    this.store_id = store_id,
    this.brand = brand,
    this.attendant = attendant,
    this.attendant_id = attendant_id,
    this.store = store
    this.exp_date = exp_date
  }

  
  static schema = {
    name: "Expired",
    properties: {
      _id: "string?",
      _partition: "string?",
      date: "string",
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      product: "string",
      quantity: "int",
      sprice: "int",
      oprice: "int",
      store_id: "string",
      attendant: "string",
      attendant_id: "string",
      store: "string",
      exp_date: "string",
      brand:"string"
    },
    primaryKey: "_id",
  };
}

class TransferLogs {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    date,
    year,
    year_week,
    year_month,
    timeStamp,
    product,
    quantity,
    sprice,
    oprice,
    store_id,
    store_name,
    transferred_by,
    unit,
    category
  }) {
    this._partition = partition;
    this._id = id;
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.product = product,
    this.quantity = quantity,
    this.sprice = sprice,
    this.oprice = oprice,
    this.store_id = store_id,
    this.store_name = store_name,
    this.transferred_by = transferred_by,
    this.unit = unit,
    this.category = category

  }

  
  static schema = {
    name: "TransferLogs",
    properties: {
      _id: "string",
      _partition: "string",
      date: "string",
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      product: "string",
      quantity: "int",
      sprice: "int",
      oprice: "int",
      store_id: "string",
      store_name: "string",
      transferred_by: "string",
      unit: "string",
      category: "string"
     
    },
    primaryKey: "_id",
  };
}

class Payment_Logs {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    id,
    partition,
    date,
    year,
    year_week,
    year_month,
    timeStamp,
    customer_id,
    customer_name,
    received_by,
    amount,
    store_name,
    store_id,
    receipt_no
  }) {
    this._id = id,
    this._partition =partition,
    this.date = date,
    this.year = year,
    this.year_week = year_week,
    this.year_month = year_month,
    this.timeStamp = timeStamp,
    this.customer_id = customer_id,
    this.customer_name = customer_name,
    this.received_by = received_by,
    this.amount = amount,
    this.store_name = store_name,
    this.store_id = store_id,
    this.receipt_no = receipt_no

  }

  
  static schema = {
    name: "Payment_Logs",
    properties: {
      _id: "string?",
      _partition: "string?",
      date: "string",
      year: "string",
      year_week: "string",
      year_month: "string",
      timeStamp: "int",
      customer_id: "string",
      customer_name: "string",
      received_by: "string",
      amount: "int",
      store_name: "string",
      store_id: "string",
      receipt_no: "string"
     
    },
    primaryKey: "_id",
  };
}

class Transactions {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    store_name,
    store_id,
    partition,
    date,
    timeStamp,
    customer_name,
    customer_id,
    total,
    id,
    attendant_name,
    attendant_id,
    year,
    year_month,
    year_week,
    payment_method,
    status,
    total_items,
    discount,
    discount_name,
    vat,
    received,
    change
  }) {
    this._partition = partition;
    this._id = id;
    this.store_name = store_name,
    this.store_id = store_id,
    this.date = date,
    this.timeStamp = timeStamp,
    this.customer_name = customer_name,
    this.customer_id = customer_id,
    this.total = total,
    this.attendant_name = attendant_name,
    this.attendant_id = attendant_id,
    this.year = year,
    this.year_month = year_month,
    this.year_week = year_week,
    this.payment_method = payment_method,
    this.status = status
    this.total_items = total_items,
    this.discount = discount,
    this.discount_name = discount_name,
    this.vat = vat,
    this.received = received,
    this.change = change
  }
 
  static schema = {
    name: "Transactions",
    properties: {
      _id: "string",
      _partition : "string",
      store_name: "string",
      store_id: "string",
      date: "string",
      timeStamp: "int",
      customer_name: "string",
      customer_id: "string",
      total: "float",
      attendant_name: "string",
      attendant_id: "string",
      year: "string",
      year_month: "string",
      year_week: "string",
      payment_method:"string",
      status: "string",
      total_items: "float",
      discount: "float",
      discount_name: 'string',
      vat: "float",
      received: "float",
      change: "float"
    },
    primaryKey: "_id",
  };
}


class TR_Details {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    brand,
    oprice,
    sprice,
    unit,
    category,
    store_id,
    store,
    quantity,
    tr_id,
    id,
    year,
    year_month,
    year_week,
    date,
    timeStamp,
    product_id,
    status,
    attendant_name,
    attendant_id
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.brand = brand;
    this.oprice = oprice;
    this.sprice = sprice;
    this.unit = unit;
    this.category = category;
    this.store_id = store_id;
    this.store = store;
    this.tr_id = tr_id;
    this.quantity = quantity;
    this.year = year,
    this.year_month = year_month ,
    this.year_week = year_week,
    this.date = date,
    this.timeStamp = timeStamp,
    this.product_id = product_id,
    this.status = status,
    this.attendant_name = attendant_name,
    this.attendant_id = attendant_id
  }

  
  static schema = {
    name: "TR_Details",
    properties: {
      _id: "string",
      _partition: "string",
      name: "string",
      brand: "string",
      oprice: "float",
      sprice: "float",
      unit: "string",
      category: "string",
      store_id: "string",
      store: "string",
      quantity: "float",
      tr_id: 'string',
      year: 'string',
      year_month: 'string',
      year_week: 'string',
      date: 'string',
      timeStamp: 'int',
      status: 'string',
      attendant_name: "string",
      attendant_id: "string"
    },
    primaryKey: "_id",
  };
}

class Inventory {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    partition,
    id,
    name,
    cost,
    price,
    product_id
   
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.cost = cost;
    this.price = price;
    this.product_id = product_id
   
  }
 
  static schema = {
    name: "Inventory",
    properties: {
      _id: "string",
      _partition : "string",
      name: "string",
      cost: "float",
      price: "float",
      product_id: "string"
    },
    primaryKey: "_id",
  };
}


export { 
         Stores, 
         Products, 
         Categories, 
         Expenses, 
         Customers, 
         Staffs, 
         List, 
         Settings,
         SupplierWarehouse, 
         WarehouseProducts, 
         CategoriesWarehouse, 
         BOWarehouse,
         PulloutWarehouse,
         ExpiredWarehouse,
         DeliveryReportWarehouse,
         DeliveryReport,
         DeliveryReportSummary,
         TransferLogs,
         DeliveryStoreSummary,
         Expired,
         Pullout,
         BO,
         Returned,
         Discount,
         Payment_Logs,
         Transactions,
         TR_Details,
         Inventory
        };
