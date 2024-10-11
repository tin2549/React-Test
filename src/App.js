import Transition from "./components/Transition";
import FormComponent from "./components/FormComponent"
import './App.css'
import { useEffect, useState} from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import {BrowserRouter as Router,Routes ,Route,Link} from "react-router-dom";
function App() {
  const design = {color:"red",textAlign:"center",fontSize:'1.5rem'}
   
  
  const [items,setItems] = useState([])
  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  const onAddNewItem = (newItem) =>{
    setItems((prevItem)=>{
      return [newItem,...prevItem]
    })
  } 
  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    const income =amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
    const expense =(amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
  },[items,reportIncome,reportExpense]) 

  

  return (
    <DataContext.Provider value={{income : reportIncome,expense : reportExpense}}>
    <div className="container">
      <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
      <Router>
      <div>
        <ul className="horizontal-menu">
          <li>
            <Link to ="/">ข้อมูลบัญชี</Link>
          </li>
          <li>
            <Link to ="/insert">บันทึกข้อมูล</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<ReportComponent/>} /> {/* ใช้ element prop */}
        
          <Route path="/insert" element ={
            <>
            <FormComponent onAddItem={onAddNewItem}/>
            <Transition items = {items}/> 
            </>
          }/>
        </Routes>
      </div>
      </Router>
    </div>
    </DataContext.Provider>
    
  );
}

export default App;
