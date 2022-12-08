import React, { useContext, useRef, useState, useEffect  } from 'react';
import uuid from 'react-native-uuid';
import {  
  Stores, 
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
  Products,
  Inventory,
  
} from '../../schemas';
import { useAuth } from './AuthContext';
import moment from 'moment'


const StoreContext = React.createContext(null);

const StoreProvider = ({ children, projectPartition }) => {

    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouse_products, setWarehouseProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [warehouse_category, setWarehouseCategory] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [settings, setSettings] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [trdetails, setTrDetails] = useState([]);
    const [alltrdetails, setAllTRDetails] = useState([]);
    const [warehouse_supplier, setSupplierWarehouse] = useState([]);
    const [warehouse_bo, setBOWarehouse] = useState([]);
    const [warehouse_pullout, setPulloutWarehouse] = useState([]);
    const [warehouse_expired, setExpiredWarehouse] = useState([]);
    const [warehouse_delivery_report, setWarehouseDeliveryReport] = useState([]);
    const [custom_transactions, setCustomTransactions] = useState([]);
    const [custom_transactions2, setCustomTransactions2] = useState([]);
    const [custom_transactions3, setCustomTransactions3] = useState([]);
    const [custom_transactions5, setCustomTransactions5] = useState([]);
    const [custom_transactions4, setCustomTransactions4] = useState([]);
    const [custom_expenses, setCustomExpenses] = useState([]);
    const [custom_expenses2, setCustomExpenses2] = useState([]);
    const [custom_expenses3, setCustomExpenses3] = useState([]);
    const [custom_expenses4, setCustomExpenses4] = useState([]);
    const [warehouse_delivery_report_summary,setWarehouseDeliveryReportSummary] = useState([])
    const [credits, setCredits] = useState([])
    const [transfer_logs, setTransferLogs] = useState([])
    const [store_delivery, setStoreDelivery] = useState([])
    const [store_delivery_summary, setStoreDeliverySummary] = useState([])
    const [expired, setStoreExpired] = useState([])
    const [pullout, setStorePullout] = useState([])
    const [bo, setStoreBO] = useState([])
    const [returned, setStoreReturned] = useState([])
    const [discount, setStoreDiscounts] = useState([])
    const [payment, setPayments] = useState([])
    const [user_info, setUser] = useState([])
    const realmRef = useRef(null);
    const [inventory, setInventory] = useState([]);

    const date = moment().unix()
    const today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;


  useEffect(() => {
    setLoading(true)
    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };
    const config = {
      sync: {
    
        user: user,
        partitionValue: projectPartition,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    // TODO: Open the project realm with the given configuration and store
    // it in the realmRef. Once opened, fetch the Task objects in the realm,
    // sorted by name, and attach a listener to the Task collection. When the
    // listener fires, use the setTasks() function to apply the updated Tasks
    // list to the state.

    Realm.open(config).then((projectPOS) => {
      realmRef.current = projectPOS;

      const syncStaffs = projectPOS.objects("Staffs");
      let sortedStaffs = syncStaffs.sorted("name");
      setStaffs([...sortedStaffs]);
      sortedStaffs.addListener(() => {
        setStaffs([...sortedStaffs]);
  
      });

      const syncStore = projectPOS.objects("Stores");
      let sortedStore = syncStore.sorted("name");
      setStores([...sortedStore]);
      sortedStore.addListener(() => {
        setStores([...sortedStore]);
        
      });

      const syncCustomers = projectPOS.objects("Customers");
      let sortedCustomers = syncCustomers.sorted("name");
      setCustomers([...sortedCustomers]);
      sortedCustomers.addListener(() => {
        setCustomers([...sortedCustomers]);
  
      });
   

      const getCategory = projectPOS.objects("Categories");
      let sortedCategory = getCategory.sorted("name");
      setCategory([...sortedCategory]);
      sortedCategory.addListener(() => {
        setCategory([...sortedCategory]);
    
      });

      const syncExpenses = projectPOS.objects("Expenses");
      const filteredExpenses = syncExpenses.filtered("date == $0", today);
      let sortedExpenses = filteredExpenses.sorted("timeStamp");
      setExpenses([...sortedExpenses]);
      sortedExpenses.addListener(() => {
        setExpenses([...sortedExpenses]);
     
      });

      const syncProducts = projectPOS.objects("Products");
      let sortedProducts = syncProducts.sorted("name");
      setProducts([...sortedProducts]);
      sortedProducts.addListener(() => {
        setProducts([...sortedProducts]);
   
      });

      const syncWarehouseProducts = projectPOS.objects("WarehouseProducts");
      let sortedWarehouseProducts = syncWarehouseProducts.sorted("name");
      setWarehouseProducts([...sortedWarehouseProducts]);
      sortedWarehouseProducts.addListener(() => {
        setWarehouseProducts([...sortedWarehouseProducts]);
    
      });

      const getWarehouseCategory = projectPOS.objects("CategoriesWarehouse");
      let sortedWarehouseCategory= getWarehouseCategory.sorted("name");
      setWarehouseCategory([...sortedWarehouseCategory]);
      sortedWarehouseCategory.addListener(() => {
        setWarehouseCategory([...sortedWarehouseCategory]);
     
      });

    


      const syncTransactions = projectPOS.objects("Transactions");
      const filteredTransactions = syncTransactions.filtered("date == $0", today);
      let sortedTransactions = filteredTransactions.sorted("timeStamp");
      setTransactions([...sortedTransactions]);
      sortedTransactions.addListener(() => {
        setTransactions([...sortedTransactions]);
       
      });

      const syncTransferLogs = projectPOS.objects("TransferLogs");
      let sortedTransferLogs = syncTransferLogs.sorted("timeStamp");
      setTransferLogs([...sortedTransferLogs]);
      sortedTransferLogs.addListener(() => {
        setTransferLogs([...sortedTransferLogs]);
     
      });


  
      const syncSupplierWarehouse = projectPOS.objects("SupplierWarehouse");
      let sortedSupplierWarehouse = syncSupplierWarehouse.sorted("name");
      setSupplierWarehouse([...sortedSupplierWarehouse]);
      sortedSupplierWarehouse.addListener(() => {
        setSupplierWarehouse([...sortedSupplierWarehouse]);
   
      });

      const syncBOWarehouse = projectPOS.objects("BOWarehouse");
      let sortedBOWarehouse= syncBOWarehouse.sorted("timeStamp");
      setBOWarehouse([...sortedBOWarehouse]);
      sortedBOWarehouse.addListener(() => {
        setBOWarehouse([...sortedBOWarehouse]);
   
      });

      const syncPulloutWarehouse = projectPOS.objects("PulloutWarehouse");
      let sortedPulloutWarehouse= syncPulloutWarehouse.sorted("timeStamp");
      setPulloutWarehouse([...sortedPulloutWarehouse]);
      sortedPulloutWarehouse.addListener(() => {
        setPulloutWarehouse([...sortedPulloutWarehouse]);
   
      });

    

      const syncWarehouseDeliveryReport = projectPOS.objects("DeliveryReportWarehouse");
      let sortedWarehouseDeliveryReport= syncWarehouseDeliveryReport.sorted("timeStamp");
      setWarehouseDeliveryReport([...sortedWarehouseDeliveryReport]);
      sortedWarehouseDeliveryReport.addListener(() => {
        setWarehouseDeliveryReport([...sortedWarehouseDeliveryReport]);
   
      });

      const syncWarehouseDeliveryReportSummary = projectPOS.objects("DeliveryReportSummary");
      let sortedWarehouseDeliveryReportSummary= syncWarehouseDeliveryReportSummary.sorted("timeStamp");
      setWarehouseDeliveryReportSummary([...sortedWarehouseDeliveryReportSummary]);
      sortedWarehouseDeliveryReportSummary.addListener(() => {
        setWarehouseDeliveryReportSummary([...sortedWarehouseDeliveryReportSummary]);
     
      });

      const syncAllTRDetails = projectPOS.objects("TR_Details");
      let sortedAllTRDetails = syncAllTRDetails.sorted("timeStamp");
      setAllTRDetails([...sortedAllTRDetails]);
      sortedAllTRDetails.addListener(() => {
        setAllTRDetails([...sortedAllTRDetails]);
      });

      const syncInventory = projectPOS.objects("Inventory");
      setInventory([...syncInventory]);
      syncInventory.addListener(() => {
        setInventory([...syncInventory]);
      });

      const syncSettings = projectPOS.objects("Settings");
     
      setSettings([...syncSettings]);
      syncSettings.addListener(() => {
        setSettings([...syncSettings]);
       
      });

    });
    setLoading(false)
    return () => {
      // cleanup function
      const projectPOS = realmRef.current;
      if (projectPOS) {
        projectPOS.close();
        realmRef.current = null;
        setStores([]);
     
        setLoading(false)
      }
    };
  }, [user]);

 
  const updateBatchProduct = (product, item, key) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    const projectPOS = realmRef.current;
    switch (key) {
      case 'name':
        projectPOS.write(() => {
          product.name = item;
       
        });
        break;

    case 'oprice':
        projectPOS.write(() => {
          product.oprice = item;
       
        });
        break;

    case 'sprice':
        projectPOS.write(() => {
          product.sprice = item;
       
        });
        break;

    case 'stock':
        projectPOS.write(() => {
          product.stock = item;
       
        });
        break;
    }

   
   
  };
  
  const createStore = (newStore, branch, password, type ) => {
    const projectPOS = realmRef.current;
 
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Stores",
        new Stores({
          name: newStore,
          branch: branch,
          password: password,
          id: uuid.v4(),
          owner: `${user.id}`,
          partition: `project=${user.id}`,
          attendant: '',
          attendant_id: '',
          store_type: type
        })
      );
    });
  };

  const createWarehouseExpired = ( expired, product ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "ExpiredWarehouse",
        new ExpiredWarehouse(expired)
      );
      product.stock -= expired.quantity;
    });
  };
  

  const createWarehousePullout = ( pullout, product ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "PulloutWarehouse",
        new PulloutWarehouse(pullout)
      );
      product.stock -= pullout.quantity;
    });
  };


  const createWarehouseBO = ( BO, product ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "BOWarehouse",
        new BOWarehouse(BO)
      );

      product.stock -= BO.quantity;
    });
  };

  
  const createExpenses = ( expenses ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Expenses",
        new Expenses(expenses)
      );
    });
  };

  const createExpired = ( expired, product ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Expired",
        new Expired(expired)
      );
      product.stock -= expired.quantity;
    });
  };

  const createPullout= ( pullout ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Pullout",
        new Pullout(pullout)
      );
    });
  };

  const createReturned = ( returned ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Returned",
        new Returned(returned)
      );
      
    });
  };

  const createBO= ( bo ,  product) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "BO",
        new BO(bo)
      );
      product.stock -= bo.quantity;
    });
  };


  const createWarehouseSupplier = ( supplier ) => {

    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "SupplierWarehouse",
        new SupplierWarehouse(supplier)
      );
    });
  };

  const createtransferLogs = ( logs ) => {

    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "TransferLogs",
        new TransferLogs(logs)
      );
    });
  };


  const createCustomer = ( customer ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Customers",
        new Customers(customer)
      );
    });
  };

  const onSendProducts = ( productss, w_products ) => {
    
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      const products = projectPOS.objects("Products");
      const products2 = projectPOS.objects("WarehouseProducts"); 

      const filteredProducts2 = products.filtered("pr_id == $0", productss.pr_id);
      const filteredProducts3 = filteredProducts2.filtered("store_id == $0", productss.store_id);

      const filteredProducts4 = products2.filtered("_id == $0", productss.pr_id);

      if(filteredProducts3.length == 0){
        filteredProducts4[0].stock -= productss.stock;
        projectPOS.create(
          "Products",
          new Product(productss)
        );
      }else{
        filteredProducts4[0].stock -= productss.stock;
        filteredProducts3[0].stock += productss.stock;
      }
    });
  };

  const createProducts = ( product ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      const products = projectPOS.objects("Products");
      const filteredProducts = products.filtered("_id == $0", product.id);
      if(filteredProducts.length == 0){
      projectPOS.create(
        "Products",
        new Products(product)
      );
      }else{
        filteredProducts[0].stock += product.stock;
      }
    });
  };


  const createInventory = ( id, inv ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      inv.forEach(element => {
        projectPOS.create(
          "Inventory",
          new Inventory({
            id: uuid.v4(),
            partition: `project=${user.id}`,
            name: element.name,
            cost: element.cost,
            price: element.price,
            product_id:id
          })
        );
      });
     
    });
  };

 
  const createWarehouseDeliveryReport = ( drw ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "DeliveryReportWarehouse",
        new DeliveryReportWarehouse(drw)
      );
    });
  };

  const createDeliverySummary= ( drs ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "DeliveryReportSummary",
        new DeliveryReportSummary(drs)
      );
    });
  };

  const createStoreDeliverySummary= ( drs ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "DeliveryStoreSummary",
        new DeliveryStoreSummary(drs)
      );
    });
  };
  
  const createDeliveryReport = ( drs ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "DeliveryReport",
        new DeliveryReport(drs)
      );
    });
  };

  

  const createWarehouseProducts = ( product ) => {
    const projectPOS = realmRef.current;
      projectPOS.write(() => {
        const products = projectPOS.objects("WarehouseProducts");
        const filteredProducts2 = products.filtered("_id == $0", product.id);
        if(filteredProducts2.length == 0){
      projectPOS.create(
        "WarehouseProducts",
        new WarehouseProducts(product)
      );
    }else{
      filteredProducts2[0].stock += product.stock;
    }
    });
  };

  const updateSettings = ( settings ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      const allow_credit = projectPOS.objects("Settings")[0];

      allow_credit.allow_credit = settings;
    });
  };

  const updateStaff = (staff, new_staff) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      staff.name = new_staff.name
      staff.password = new_staff.password
      staff.status = new_staff.status
    });
  };


  const updateProduct = (product, new_product) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      product.name = new_product.name;
      product.brand = new_product.brand;
      product.oprice = new_product.oprice;
      product.sprice = new_product.sprice;
      product.unit = new_product.unit;
      product.stock = new_product.stock;
      product.category = new_product.category;
      product.sku = new_product.sku;
      product.img = new_product.img
    });
  };

  const onUpdateVariants = (variant, element, field) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    if(field === 'name'){
      const projectPOS = realmRef.current;
      projectPOS.write(() => {
        variant.name = element;
      });
    }
    if(field === 'cost'){
      const projectPOS = realmRef.current;
      projectPOS.write(() => {
        variant.cost = element;
      });
    }
    if(field === 'price'){
      const projectPOS = realmRef.current;
      projectPOS.write(() => {
        variant.price = element;
      });
    }
   
  };

  const createCategories = ( name, uid ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Categories",
        new Categories({
          partition: `project=${user.id}`,
          id: uuid.v4(),
          name : name,
          store_id: uid,
        })
      );
    });
  };

  const createPayment = ( payment ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Payment_Logs",
        new Payment_Logs(payment)
      );
    });
  };

  const createWarehouseCategories = ( name ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "CategoriesWarehouse",
        new CategoriesWarehouse({
          partition: `project=${user.id}`,
          id: uuid.v4(),
          name : name,
          owner_id: user.id,
        })
      );
    });
  };



  const createStaff = ( name, uid, uname, password , status) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "Staffs",
        new Staffs({
          id: uuid.v4(),
          partition: `project=${user.id}`,
          login_am:"",
          login_pm:"",
          status: status,
          logout_am:"",
          logout_pm:"",
          name : name,
          store_id: uid,
          store: uname,
          password: password
        })
      );
    });
  };

  const getTRDetails = (tr_id) => {
    const projectPOS = realmRef.current;
    const syncTrDetails = projectPOS.objects("TR_Details");
    const filteredTRDetails = syncTrDetails.filtered("tr_id == $0", tr_id);
    let sortedTrDetails = filteredTRDetails.sorted("timeStamp");
    setTrDetails([...sortedTrDetails]);
   }

   const getCustomExpenses2 = (store, date, type) => {
    const projectPOS = realmRef.current;
    const syncExpenses= projectPOS.objects("Expenses");

    if(type === 1){
      const filteredStoreExpenses= syncExpenses.filtered("store_id == $0", store);
      const filteredDateExpenses= filteredStoreExpenses.filtered("date == $0", date);
      setCustomExpenses2([...filteredDateExpenses]);
    }
    if(type === 2){
      const filteredStoreExpenses= syncExpenses.filtered("store_id == $0", store);
      const filteredDateExpenses= filteredStoreExpenses.filtered("year_month == $0", date);
      setCustomExpenses2([...filteredDateExpenses]);
    }
    if(type === 3){
      const filteredStoreExpenses= syncExpenses.filtered("store_id == $0", store);
      const filteredDateExpenses= filteredStoreExpenses.filtered("year_week == $0", date);
      setCustomExpenses2([...filteredDateExpenses]);
    }
    if(type === 4){
      const filteredStoreExpenses= syncExpenses.filtered("store_id == $0", store);
      const filteredDateExpenses= filteredStoreExpenses.filtered("timeStamp == $0", date);
      setCustomExpenses2([...filteredDateExpenses]);
    }
    if(type === 5){
      const filteredStoreExpenses= syncExpenses.filtered("store_id == $0", store);
      const filteredDateExpenses= filteredStoreExpenses.filtered("year == $0", date);
      setCustomExpenses2([...filteredDateExpenses]);
    }

   }

   const getCustomExpenses3 = (store, date, attendant, type) => {
    const projectPOS = realmRef.current;
    const syncExpenses= projectPOS.objects("Expenses");

    if(type === 1){
      const filteredStoreExpenses= syncExpenses.filtered("store_id == $0", store);
      const filteredStoreAttendant= filteredStoreExpenses.filtered("attendant_id == $0", attendant);
      const filteredDateExpenses= filteredStoreAttendant.filtered("date == $0", date);
      setCustomExpenses3([...filteredDateExpenses]);
    }
    if(type === 2){
      const filteredStoreExpenses= syncExpenses.filtered("store_id == $0", store);
      const filteredStoreAttendant= filteredStoreExpenses.filtered("attendant_id == $0", attendant);
      const filteredDateExpenses= filteredStoreAttendant.filtered("year_month == $0", date);
      setCustomExpenses3([...filteredDateExpenses]);
    }
    if(type === 3){
      const filteredStoreExpenses= syncExpenses.filtered("store_id == $0", store);
      const filteredStoreAttendant= filteredStoreExpenses.filtered("attendant_id == $0", attendant);
      const filteredDateExpenses= filteredStoreAttendant.filtered("year_week == $0", date);
      setCustomExpenses3([...filteredDateExpenses]);
    }
    if(type === 4){
      const filteredStoreExpenses= syncExpenses.filtered("store_id == $0", store);
      const filteredStoreAttendant= filteredStoreExpenses.filtered("attendant_id == $0", attendant);
      const filteredDateExpenses= filteredStoreAttendant.filtered("timeStamp == $0", date);
      setCustomExpenses3([...filteredDateExpenses]);
    }
    if(type === 5){
      const filteredStoreExpenses= syncExpenses.filtered("store_id == $0", store);
      const filteredStoreAttendant= filteredStoreExpenses.filtered("attendant_id == $0", attendant);
      const filteredDateExpenses= filteredStoreAttendant.filtered("year == $0", date);
      setCustomExpenses3([...filteredDateExpenses]);
    }

   }

   const getCustomExpenses4 = (date, type) => {
    const projectPOS = realmRef.current;
    const syncExpenses= projectPOS.objects("Expenses");

    if(type === 1){
      const filteredDateExpenses= syncExpenses.filtered("date == $0", date);
      setCustomExpenses4([...filteredDateExpenses]);
    }
    if(type === 2){
      const filteredDateExpenses= syncExpenses.filtered("year_month == $0", date);
      setCustomExpenses4([...filteredDateExpenses]);
    }
    if(type === 3){
      const filteredDateExpenses= syncExpenses.filtered("year_week == $0", date);
      setCustomExpenses4([...filteredDateExpenses]);
    }
    if(type === 4){
      const filteredDateExpenses= syncExpenses.filtered("timeStamp == $0", date);
      setCustomExpenses4([...filteredDateExpenses]);
    }
    if(type === 5){
      const filteredDateExpenses= syncExpenses.filtered("year == $0", date);
      setCustomExpenses4([...filteredDateExpenses]);
    }

   }

   const getCustomExpenses = (date, type) => {
    const projectPOS = realmRef.current;
    const syncExpenses= projectPOS.objects("Expenses");

    if(type === 1){
      const filteredDateExpenses= syncExpenses.filtered("date == $0", date);
      setCustomExpenses([...filteredDateExpenses]);
    }
    if(type === 2){
      const filteredDateExpenses= syncExpenses.filtered("year_month == $0", date);
      setCustomExpenses([...filteredDateExpenses]);
    }
    if(type === 3){
      const filteredDateExpenses= syncExpenses.filtered("year_week == $0", date);
      setCustomExpenses([...filteredDateExpenses]);
    }
    if(type === 4){
      const filteredDateExpenses= syncExpenses.filtered("timeStamp == $0", date);
      setCustomExpenses([...filteredDateExpenses]);
    }
    if(type === 5){
      const filteredDateExpenses= syncExpenses.filtered("year == $0", date);
      setCustomExpenses([...filteredDateExpenses]);
    }

   }

   const getCustomSales2 = ( date,  type) => {
    const projectPOS = realmRef.current;
    const syncCustomTransactions = projectPOS.objects("Transactions");

        if(type === 1){
          const filteredDateTransactions= syncCustomTransactions.filtered("date == $0", date);
          setCustomTransactions2([...filteredDateTransactions]);
        }
        if(type === 2){
  
          const filteredDateTransactions= syncCustomTransactions.filtered("year_month == $0", date);
          setCustomTransactions2([...filteredDateTransactions]);
        }
        if(type === 3){

          const filteredDateTransactions= syncCustomTransactions.filtered("year_week == $0", date);
          setCustomTransactions2([...filteredDateTransactions]);
        }
        if(type === 4){
 
          const filteredDateTransactions= syncCustomTransactions.filtered("timeStamp == $0", date);
          setCustomTransactions2([...filteredDateTransactions]);
        }
        if(type === 5){

          const filteredDateTransactions= syncCustomTransactions.filtered("year == $0", date);
          setCustomTransactions2([...filteredDateTransactions]);
        }
  
    

   }

   const getCustomSales3 = (store, date, attendant, type) => {
    const projectPOS = realmRef.current;
    const syncTransactions = projectPOS.objects("Transactions");
        if(type === 1){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredStoreAttendant= filteredStoreTransactions.filtered("attendant_id == $0", attendant);
          const filteredDateTransactions= filteredStoreAttendant.filtered("date == $0", date);
          setCustomTransactions3([...filteredDateTransactions]);
        }
        if(type === 2){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredStoreAttendant= filteredStoreTransactions.filtered("attendant_id == $0", attendant);
          const filteredDateTransactions= filteredStoreAttendant.filtered("year_month == $0", date);
          setCustomTransactions3([...filteredDateTransactions]);
        }
        if(type === 3){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredStoreAttendant= filteredStoreTransactions.filtered("attendant_id == $0", attendant);
          const filteredDateTransactions= filteredStoreAttendant.filtered("year_week == $0", date);
          setCustomTransactions3([...filteredDateTransactions]);
        }
        if(type === 4){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredStoreAttendant= filteredStoreTransactions.filtered("attendant_id == $0", attendant);
          const filteredDateTransactions= filteredStoreAttendant.filtered("timeStamp == $0", date);
          setCustomTransactions3([...filteredDateTransactions]);
        }
        if(type === 5){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredStoreAttendant= filteredStoreTransactions.filtered("attendant_id == $0", attendant);
          const filteredDateTransactions= filteredStoreAttendant.filtered("year == $0", date);
          setCustomTransactions3([...filteredDateTransactions]);
        }
  
    

   }

   const getCustomSales = (store, date,type) => {
    const projectPOS = realmRef.current;
    const syncTransactions = projectPOS.objects("Transactions");
        if(type === 1){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredDateTransactions= filteredStoreTransactions.filtered("date == $0", date);
          setCustomTransactions([...filteredDateTransactions]);
        }
        if(type === 2){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredDateTransactions= filteredStoreTransactions.filtered("year_month == $0", date);
          setCustomTransactions([...filteredDateTransactions]);
        }
        if(type === 3){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredDateTransactions= filteredStoreTransactions.filtered("year_week == $0", date);
          setCustomTransactions([...filteredDateTransactions]);
        }
        if(type === 4){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredDateTransactions= filteredStoreTransactions.filtered("timeStamp == $0", date);
          setCustomTransactions([...filteredDateTransactions]);
        }
        if(type === 5){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredDateTransactions= filteredStoreTransactions.filtered("year == $0", date);
          setCustomTransactions([...filteredDateTransactions]);
        }
  
    

   }

   const getCustomSales4 = ( date,  type) => {
    const projectPOS = realmRef.current;
    const syncCustomTransactions = projectPOS.objects("Transactions");

        if(type === 1){
          const filteredDateTransactions= syncCustomTransactions.filtered("date == $0", date);
          setCustomTransactions4([...filteredDateTransactions]);
        }
        if(type === 2){
  
          const filteredDateTransactions= syncCustomTransactions.filtered("year_month == $0", date);
          setCustomTransactions4([...filteredDateTransactions]);
        }
        if(type === 3){

          const filteredDateTransactions= syncCustomTransactions.filtered("year_week == $0", date);
          setCustomTransactions4([...filteredDateTransactions]);
        }
        if(type === 4){
 
          const filteredDateTransactions= syncCustomTransactions.filtered("timeStamp == $0", date);
          setCustomTransactions4([...filteredDateTransactions]);
        }
        if(type === 5){

          const filteredDateTransactions= syncCustomTransactions.filtered("year == $0", date);
          setCustomTransactions4([...filteredDateTransactions]);
        }
  
    

   }
   const getCustomSales5 = (store, date,type) => {
    const projectPOS = realmRef.current;
  
    const syncTransactions = projectPOS.objects("Transactions");
        if(type === 1){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredDateTransactions= filteredStoreTransactions.filtered("date == $0", date);
          setCustomTransactions5([...filteredDateTransactions]);
        }
        if(type === 2){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredDateTransactions= filteredStoreTransactions.filtered("year_month == $0", date);
          setCustomTransactions5([...filteredDateTransactions]);
        }
        if(type === 3){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredDateTransactions= filteredStoreTransactions.filtered("year_week == $0", date);
          setCustomTransactions5([...filteredDateTransactions]);
        }
        if(type === 4){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredDateTransactions= filteredStoreTransactions.filtered("timeStamp == $0", date);
          setCustomTransactions5([...filteredDateTransactions]);
        }
        if(type === 5){
          const filteredStoreTransactions= syncTransactions.filtered("store_id == $0", store);
          const filteredDateTransactions= filteredStoreTransactions.filtered("year == $0", date);
          setCustomTransactions5([...filteredDateTransactions]);
        }
  
    

   }

   const getCustomTransaction = (type, value) => {
    const projectPOS = realmRef.current;
    switch (type) {
      
      case 'Today':
          const syncTodaysTransactions = projectPOS.objects("Transactions");
          const filteredTodaysAttendanceLogs = syncTodaysTransactions.filtered("date == $0", value.date);
          let sortedTodaysTransactions = filteredTodaysAttendanceLogs.sorted("timeStamp");
          setTransactions([...sortedTodaysTransactions]);
        break;
        case 'This week':
          const syncThisWeekTransactions = projectPOS.objects("Transactions");
          const filteredThisWeekAttendanceLogs = syncThisWeekTransactions.filtered("year_week == $0", value.date);
          let sortedThisWeekTransactions = filteredThisWeekAttendanceLogs.sorted("timeStamp");
          setTransactions([...sortedThisWeekTransactions]);
        break;
      
        case 'This month':
          const syncThisMonthTransactions = projectPOS.objects("Transactions");
          const filteredThisMonthAttendanceLogs = syncThisMonthTransactions.filtered("year_month == $0", value.date);
          let sortedThisMonthTransactions = filteredThisMonthAttendanceLogs.sorted("timeStamp");
          setTransactions([...sortedThisMonthTransactions]);
        break;

        case 'This year':
          const syncThisYearTransactions = projectPOS.objects("Transactions");
          const filteredThisYearAttendanceLogs = syncThisYearTransactions.filtered("year == $0", value.date);
          let sortedThisYearTransactions = filteredThisYearAttendanceLogs.sorted("timeStamp");
          setTransactions([...sortedThisYearTransactions]);
        break;
    }
   
  }


   const  getTransferLogs = (date, type) => {
    const projectPOS = realmRef.current;
    const syncCustomTransferLogs= projectPOS.objects("TransferLogs");
  
        if(type === 1){
          const filteredTransferLogs= syncCustomTransferLogs.filtered("date == $0", date);
          setTransferLogs([...filteredTransferLogs]);
        }
        if(type === 2){
  
          const filteredTransferLogs= syncCustomTransferLogs.filtered("year_month == $0", date);
          setTransferLogs([...filteredTransferLogs]);
        }
        if(type === 3){

          const filteredTransferLogs= syncCustomTransferLogs.filtered("year_week == $0", date);
          setTransferLogs([...filteredTransferLogs]);
        }
        if(type === 4){
 
          const filteredTransferLogs= syncCustomTransferLogs.filtered("timeStamp == $0", date);
          setTransferLogs([...filteredTransferLogs]);
        }
        if(type === 5){

          const filteredTransferLogs= syncCustomTransferLogs.filtered("year == $0", date);
          setTransferLogs([...filteredTransferLogs]);
        }
  }

  const  getWarehouseSummary = (date, type) => {
    console.log(date)
    const projectPOS = realmRef.current;
    const syncCustomWarehouseSummary= projectPOS.objects("DeliveryReportSummary");
  
        if(type === 1){
          const filteredDeliveryReportSummary= syncCustomWarehouseSummary.filtered("date == $0", date);
          setWarehouseDeliveryReportSummary([...filteredDeliveryReportSummary]);
        }
        if(type === 2){
  
          const filteredDeliveryReportSummary= syncCustomWarehouseSummary.filtered("year_month == $0", date);
          setWarehouseDeliveryReportSummary([...filteredDeliveryReportSummary]);
        }
        if(type === 3){

          const filteredDeliveryReportSummary= syncCustomWarehouseSummary.filtered("year_week == $0", date);
          setWarehouseDeliveryReportSummary([...filteredDeliveryReportSummary]);
        }
        if(type === 4){
 
          const filteredDeliveryReportSummary= syncCustomWarehouseSummary.filtered("timeStamp == $0", date);
          setWarehouseDeliveryReportSummary([...filteredDeliveryReportSummary]);
        }
        if(type === 5){

          const filteredDeliveryReportSummary= syncCustomWarehouseSummary.filtered("year == $0", date);
          setWarehouseDeliveryReportSummary([...filteredDeliveryReportSummary]);
        }
  }

  const getWarehouseExpired = (date, type) => {
    const projectPOS = realmRef.current;
    const syncExpiredWarehouse= projectPOS.objects("ExpiredWarehouse");

    if(type === 1){
      const filteredExpiredWarehouse= syncExpiredWarehouse.filtered("date == $0", date);
      setExpiredWarehouse([...filteredExpiredWarehouse]);
    }
    if(type === 2){
      const filteredExpiredWarehouse= syncExpiredWarehouse.filtered("year_month == $0", date);
      setExpiredWarehouse([...filteredExpiredWarehouse]);
    }
    if(type === 3){
      const filteredExpiredWarehouse= syncExpiredWarehouse.filtered("year_week == $0", date);
      setExpiredWarehouse([...filteredExpiredWarehouse]);
    }
    if(type === 4){
      const filteredExpiredWarehouse= syncExpiredWarehouse.filtered("timeStamp == $0", date);
      setExpiredWarehouse([...filteredExpiredWarehouse]);
    }
    if(type === 5){
      const filteredExpiredWarehouse= syncExpiredWarehouse.filtered("year == $0", date);
      setExpiredWarehouse([...filteredExpiredWarehouse]);
    }

   }

   const getStoreDelivery = (date, type) => {
    const projectPOS = realmRef.current;
    const syncStoreDelivery= projectPOS.objects("DeliveryReport");

    if(type === 1){
      const filteredStoreDelivery= syncStoreDelivery.filtered("date == $0", date);
      setStoreDelivery([...filteredStoreDelivery]);
    }
    if(type === 2){
      const filteredStoreDelivery= syncStoreDelivery.filtered("year_month == $0", date);
      setStoreDelivery([...filteredStoreDelivery]);
    }
    if(type === 3){
      const filteredStoreDelivery= syncStoreDelivery.filtered("year_week == $0", date);
      setStoreDelivery([...filteredStoreDelivery]);
    }
    if(type === 4){
      const filteredStoreDelivery= syncStoreDelivery.filtered("timeStamp == $0", date);
      setStoreDelivery([...filteredStoreDelivery]);
    }
    if(type === 5){
      const filteredStoreDelivery= syncStoreDelivery.filtered("year == $0", date);
      setStoreDelivery([...filteredStoreDelivery]);
    }

   }

   const getStoreDeliverySummary = (date, type) => {
    const projectPOS = realmRef.current;
    const syncStoreDeliverySummary= projectPOS.objects("DeliveryStoreSummary");

    if(type === 1){
      const filteredStoreDeliverySummary= syncStoreDeliverySummary.filtered("date == $0", date);
      setStoreDeliverySummary([...filteredStoreDeliverySummary]);
    }
    if(type === 2){
      const filteredStoreDeliverySummary= syncStoreDeliverySummary.filtered("year_month == $0", date);
      setStoreDeliverySummary([...filteredStoreDeliverySummary]);
    }
    if(type === 3){
      const filteredStoreDeliverySummary= syncStoreDeliverySummary.filtered("year_week == $0", date);
      setStoreDeliverySummary([...filteredStoreDeliverySummary]);
    }
    if(type === 4){
      const filteredStoreDeliverySummary= syncStoreDeliverySummary.filtered("timeStamp == $0", date);
      setStoreDeliverySummary([...filteredStoreDeliverySummary]);
    }
    if(type === 5){
      const filteredStoreDeliverySummary= syncStoreDeliverySummary.filtered("year == $0", date);
      setStoreDeliverySummary([...filteredStoreDeliverySummary]);
    }

   }

   const getExpired = (date, type, id) => {
    const projectPOS = realmRef.current;
    const syncStoreExpired= projectPOS.objects("Expired");

    if(type === 1){
      const filteredStoreExpiredID= syncStoreExpired.filtered("store_id == $0", id);
      const filteredStoreExpired= filteredStoreExpiredID.filtered("date == $0", date);
      setStoreExpired([...filteredStoreExpired]);
    }
    if(type === 2){
      const filteredStoreExpiredID= syncStoreExpired.filtered("store_id == $0", id);
      const filteredStoreExpired= filteredStoreExpiredID.filtered("year_month == $0", date);
      setStoreExpired([...filteredStoreExpired]);
    }
    if(type === 3){
      const filteredStoreExpiredID= syncStoreExpired.filtered("store_id == $0", id);
      const filteredStoreExpired= filteredStoreExpiredID.filtered("year_week == $0", date);
      setStoreExpired([...filteredStoreExpired]);
    }
    if(type === 4){
      const filteredStoreExpiredID= syncStoreExpired.filtered("store_id == $0", id);
      const filteredStoreExpired= filteredStoreExpiredID.filtered("timeStamp == $0", date);
      setStoreExpired([...filteredStoreExpired]);
    }
    if(type === 5){
      const filteredStoreExpiredID= syncStoreExpired.filtered("store_id == $0", id);
      const filteredStoreExpired= filteredStoreExpiredID.filtered("year == $0", date);
      setStoreExpired([...filteredStoreExpired]);
    }

   }

   const getPullout= (date, type, id) => {
    const projectPOS = realmRef.current;
    const syncStorePullout= projectPOS.objects("Expired");

    if(type === 1){
      const filteredStorePulloutID= syncStorePullout.filtered("store_id == $0", id);
      const filteredStorePullout= filteredStorePulloutID.filtered("date == $0", date);
      setStorePullout([...filteredStorePullout]);
    }
    if(type === 2){
      const filteredStorePulloutID= syncStorePullout.filtered("store_id == $0", id);
      const filteredStorePullout= filteredStorePulloutID.filtered("year_month == $0", date);
      setStorePullout([...filteredStorePullout]);
    }
    if(type === 3){
      const filteredStorePulloutID= syncStorePullout.filtered("store_id == $0", id);
      const filteredStorePullout= filteredStorePulloutID.filtered("year_week == $0", date);
      setStorePullout([...filteredStorePullout]);
    }
    if(type === 4){
      const filteredStorePulloutID= syncStorePullout.filtered("store_id == $0", id);
      const filteredStorePullout= filteredStorePullout.filtered("timeStamp == $0", date);
      setStorePullout([...filteredStorePullout]);
    }
    if(type === 5){
      const filteredStorePulloutID= syncStorePullout.filtered("store_id == $0", id);
      const filteredStorePullout= filteredStorePulloutID.filtered("year == $0", date);
      setStorePullout([...filteredStorePullout]);
    }

   }

   const getBO= (date, type, id) => {
    const projectPOS = realmRef.current;
    const syncStoreBO= projectPOS.objects("BO");

    if(type === 1){
      const filteredStoreBOID= syncStoreBO.filtered("store_id == $0", id);
      const filteredStoreBO= filteredStoreBOID.filtered("date == $0", date);
      setStoreBO([...filteredStoreBO]);
    }
    if(type === 2){
      const filteredStoreBOID= syncStoreBO.filtered("store_id == $0", id);
      const filteredStoreBO= filteredStoreBOID.filtered("year_month == $0", date);
      setStoreBO([...filteredStoreBO]);
    }
    if(type === 3){
      const filteredStoreBOID= syncStoreBO.filtered("store_id == $0", id);
      const filteredStoreBO= filteredStoreBOID.filtered("year_week == $0", date);
      setStoreBO([...filteredStoreBO]);
    }
    if(type === 4){
      const filteredStoreBOID= syncStoreBO.filtered("store_id == $0", id);
      const filteredStoreBO= filteredStoreBOID.filtered("timeStamp == $0", date);
      setStoreBO([...filteredStoreBO]);
    }
    if(type === 5){
      const filteredStoreBOID= syncStoreBO.filtered("store_id == $0", id);
      const filteredStoreBO= filteredStoreBOID.filtered("year == $0", date);
      setStoreBO([...filteredStoreBO]);
    }

   }

   const getReturned= (date, type, id) => {
    const projectPOS = realmRef.current;
    const syncStoreReturned= projectPOS.objects("Returned");

    if(type === 1){
      const filteredStoreReturnedID= syncStoreReturned.filtered("store_id == $0", id);
      const filteredStoreReturned= filteredStoreReturnedID.filtered("date == $0", date);
      setStoreReturned([...filteredStoreReturned]);
    }
    if(type === 2){
      const filteredStoreReturnedID= syncStoreReturned.filtered("store_id == $0", id);
      const filteredStoreReturned= filteredStoreReturnedID.filtered("year_month == $0", date);
      setStoreReturned([...filteredStoreReturned]);
    }
    if(type === 3){
      const filteredStoreReturnedID= syncStoreReturned.filtered("store_id == $0", id);
      const filteredStoreReturned= filteredStoreReturnedID.filtered("year_week == $0", date);
      setStoreReturned([...filteredStoreReturned]);
    }
    if(type === 4){
      const filteredStoreReturnedID= syncStoreReturned.filtered("store_id == $0", id);
      const filteredStoreReturned= filteredStoreReturnedID.filtered("timeStamp == $0", date);
      setStoreReturned([...filteredStoreReturned]);
    }
    if(type === 5){
      const filteredStoreReturnedID= syncStoreReturned.filtered("store_id == $0", id);
      const filteredStoreReturned= filteredStoreReturnedID.filtered("year == $0", date);
      setStoreReturned([...filteredStoreReturned]);
    }

   }


   const getDiscount = (date, type, id) => {
    const projectPOS = realmRef.current;
    const syncStoreDiscounts= projectPOS.objects("Discount");

    if(type === 1){
      const filteredStoreDiscountsID= syncStoreDiscounts.filtered("store_id == $0", id);
      const filteredStoreDiscounts= filteredStoreDiscountsID.filtered("date == $0", date);
      setStoreDiscounts([...filteredStoreDiscounts]);
    }
    if(type === 2){
      const filteredStoreDiscountsID= syncStoreDiscounts.filtered("store_id == $0", id);
      const filteredStoreDiscounts= filteredStoreDiscountsID.filtered("year_month == $0", date);
      setStoreDiscounts([...filteredStoreDiscounts]);
    }
    if(type === 3){
      const filteredStoreDiscountsID= syncStoreDiscounts.filtered("store_id == $0", id);
      const filteredStoreDiscounts= filteredStoreDiscountsID.filtered("year_week == $0", date);
      setStoreDiscounts([...filteredStoreDiscounts]);
    }
    if(type === 4){
      const filteredStoreDiscountsID= syncStoreDiscounts.filtered("store_id == $0", id);
      const filteredStoreDiscounts= filteredStoreDiscountsID.filtered("timeStamp == $0", date);
      setStoreDiscounts([...filteredStoreDiscounts]);
    }
    if(type === 5){
      const filteredStoreDiscountsID= syncStoreDiscounts.filtered("store_id == $0", id);
      const filteredStoreDiscounts= filteredStoreDiscountsID.filtered("year == $0", date);
      setStoreDiscounts([...filteredStoreDiscounts]);
    }

   }


  const getCustomCredits = (id) => {
    const projectPOS = realmRef.current;
    const syncCredits= projectPOS.objects("Credit_Logs");
    const filteredCredits= syncCredits.filtered("customer_id == $0", id);
    setCredits([...filteredCredits]);
  }

  const getCustomPayments = (id) => {
    const projectPOS = realmRef.current;
    const syncPayments= projectPOS.objects("Payment_Logs");
    const filteredPayments= syncPayments.filtered("customer_id == $0", id);
    setPayments([...filteredPayments]);
  }

  const deleteTask = (store) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
        projectPOS.delete(store);
    setTasks([...projectPOS.objects("Store").sorted("name")]);
  });
  };

  const deleteCategory = (tab) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
        projectPOS.delete(tab);
    setCategory([...projectPOS.objects("Categories").sorted("name")]);
  });
  };

    return(
        <StoreContext.Provider
        value={{
            createStore,
            deleteTask,
            stores,
            loading,
            createProducts,
            products,
            createCategories,
            category,
            createExpenses,
            expenses,
            createCustomer,
            customers,
            createStaff,
            staffs,
            updateProduct,
            settings,
            updateSettings,
            transactions,
            getTRDetails,
            trdetails,
            alltrdetails,
            warehouse_supplier,
            createWarehouseSupplier,
            createWarehouseCategories,
            warehouse_category,
            createWarehouseProducts,
            warehouse_products,
            createWarehouseExpired, 
            createWarehouseBO, 
            createWarehousePullout,
            createWarehouseDeliveryReport, 
            createDeliveryReport,
            createDeliverySummary,
            onSendProducts,
            warehouse_bo,
            warehouse_pullout,
            warehouse_expired,
            getWarehouseExpired,
            warehouse_delivery_report,
            warehouse_delivery_report_summary,
            getCustomSales,
            custom_transactions,
            getCustomExpenses,
            custom_expenses,
            getCustomSales2,
            custom_transactions2,
            getCustomExpenses2,
            custom_expenses2,
            getCustomExpenses3,
            custom_expenses3,
            getCustomSales3,
            custom_transactions3,
            getCustomSales5,
            custom_transactions5,
            getCustomSales4,
            custom_transactions4,
            getCustomExpenses4,
            custom_expenses4,
            getWarehouseSummary,
            credits,
            getCustomCredits,
            transfer_logs,
            getTransferLogs,
            createtransferLogs,
            store_delivery,
            getStoreDelivery,
            createStoreDeliverySummary,
            store_delivery_summary,
            getStoreDeliverySummary,
            createExpired,
            getExpired,
            expired,
            createPullout,
            getPullout,
            pullout,
            createBO,
            getBO,
            bo,
            createReturned,
            getReturned,
            returned,
            getDiscount,
            discount,
            createPayment,
            getCustomPayments,
            payment,
            user_info,
            updateStaff,
            updateBatchProduct,
            getCustomTransaction,
            deleteCategory,
            onUpdateVariants,
            createInventory,
            inventory
          }}
        >
            {children}
        </StoreContext.Provider>
    );
};


const useStore = () => {
    const store = useContext(StoreContext);
    if (store == null) {
      throw new Error("useStore() called outside of a StoreProvider?"); // an alert is not placed because this is an error for the developer not the user
    }
    return store;
  };

  export { StoreProvider, useStore };