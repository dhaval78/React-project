import React, { Component } from 'react';
import { useLocation, useHistory,withRouter } from 'react-router-dom';
import queryString from 'query-string';


const employees = [
  {
  name: "Amit Kumar",
  department: "Finance",
  designation: "Manager",
  salary: 24000,
  email: "amit.kumar@company.com",
  mobile: "9898346473",
  location: "New Delhi"
  },
  {
  name: "Preeti Sharma",
  department: "Technology",
  designation: "Manager",
  salary: 28500,
  email: "preeti.sharma@company.com",
  mobile: "9898236541",
  location: "New Delhi"
  },
  {
  name: "Vishal Verma",
  department: "Operations",
  designation: "Manager",
  salary: 22100,
  email: "vishal.verma@company.com",
  mobile: "9910346632",
  location: "New Delhi"
  },
  {
  name: "Charu Kumari",
  department: "HR",
  designation: "Manager",
  salary: 23500,
  email: "charu.kumari@company.com",
  mobile: "7023734553",
  location: "New Delhi"
  },
  {
  name: "Puneet Gupta",
  department: "Finance",
  designation: "Trainee",
  salary: 14450,
  email: "puneet.gupta@company.com",
  mobile: "8836436731",
  location: "Noida"
  },
  {
  name: "Namita Singh",
  department: "Technology",
  designation: "Trainee",
  salary: 14590,
  email: "namita.singh@company.com",
  mobile: "9801228812",
  location: "Noida"
  },
  {
  name: "Samit Bansal",
  department: "Operations",
  designation: "Trainee",
  salary: 13900,
  email: "samit.bansal@company.com",
  mobile: "7003551118",
  location: "Noida"
  },
  {
  name: "Priya Talwar",
  department: "HR",
  designation: "Trainee",
  salary: 14450,
  email: "priya.talwar@company.com",
  mobile: "814452341",
  location: "Noida"
  },
  {
  name: "Shivam Singh",
  department: "Finance",
  designation: "Trainee",
  salary: 15100,
  email: "shivam.singh@company.com",
  mobile: "7173958440",
  location: "Noida"
  },
  {
  name: "Shelja Prasad",
  department: "Technology",
  designation: "Trainee",
  salary: 15500,
  email: "shelja.prasad@company.com",
  mobile: "9898346473",
  location: "Noida"
  },
  {
  name: "Mithali Dutt",
  department: "Finance",
  designation: "President",
  salary: 68200,
  email: "mithali.dutt@company.com",
  mobile: "98100346731",
  location: "New Delhi"
  },
  {
  name: "Pradeep Kumar",
  department: "Technology",
  designation: "President",
  salary: 84900,
  email: "pradeep.kumar@company.com",
  mobile: "98254634121",
  location: "New Delhi"
  },
  {
  name: "Amit Singh",
  department: "Operations",
  designation: "President",
  salary: 71250,email: "amit.singh@company.com",
  mobile: "98145537842",
  location: "New Delhi"
  },
  {
  name: "Garima Rai",
  department: "HR",
  designation: "President",
  salary: 69200,
  email: "garima.rai@company.com",
  mobile: "998107654387",
  location: "New Delhi"
  }
  ]

class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: "All",
      selectedDesignation: '',
      selectedDepartment: [],
      employees: employees, 
      currentPage: 0,
      employeesPerPage: 2,
      filteredEmployees: [],
    };
  }

  componentDidMount() {
    
    const { currentPage, employeesPerPage, employees } = this.state;
    const { location } = this.props;
    const selectedLocation = location.pathname.split('/').pop(); 
    this.setState({
      selectedLocation,
    });

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    this.setState({
      filteredEmployees: employees,
      currentEmployees: currentEmployees,
    });
   
  }
  resetFilters = () => {
    this.setState({
      selectedLocation: 'All',
      selectedDesignation: '',
      selectedDepartment: [],
    });
  };

  handleLocationChange = (location) => {
    this.resetFilters(); 
    this.setState({
      selectedLocation: location,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.location.pathname !== this.props.location.pathname ||
      prevState.selectedDesignation !== this.state.selectedDesignation ||
      prevState.selectedDepartment !== this.state.selectedDepartment
    ) {
      this.handleFiltering();
    }
  }

  handleFiltering = () => {
    const { selectedDesignation, selectedDepartment, employees } = this.state;
    const selectedLocation = this.props.location.pathname.split('/').pop();

    const filteredEmployees = employees.filter((employee) => {
      const locationMatch = selectedLocation === 'All' || employee.location === selectedLocation;
      const designationMatch =
        selectedDesignation === '' || employee.designation === selectedDesignation;
      const departmentMatch =
        selectedDepartment.length === 0 || selectedDepartment.includes(employee.department);

      return locationMatch && designationMatch && departmentMatch;
    });
    const queryParams = queryString.stringify({
      location: selectedLocation,
      designation: selectedDesignation,
      department: selectedDepartment.join(','),
    });
    this.props.history.push(`?${decodeURIComponent(queryParams)}`);
  
    this.setState({
      selectedLocation,
      filteredEmployees,
      currentPage: 0,
    });
 
  };
  handleLocationChange = (location) => {
    this.setState({
      selectedLocation: location,
      selectedDesignation: '',
      selectedDepartment: [],
    });
  };

  handleDesignationChange = (designation) => {
    this.setState({
      selectedDesignation: designation,
    });
  };

  handleDepartmentChange = (department) => {
    this.setState((prevState) => {
      const { selectedDepartment } = prevState;
      const updatedDepartment = selectedDepartment.includes(department)
        ? selectedDepartment.filter((dep) => dep !== department)
        : [...selectedDepartment, department];

      return { selectedDepartment: updatedDepartment };
    });
  };

  handleNextPage = () => {
    const { currentPage, employeesPerPage, employees } = this.state;
    const totalEmployees = employees.length;
    const lastPage = Math.ceil(totalEmployees / employeesPerPage);
  
    if (currentPage < lastPage) {
      this.setState((prevState) => {
        const nextPage = prevState.currentPage + 1;
        this.updatePageInUrl(nextPage);
       
        const indexOfFirstEmployee = nextPage * employeesPerPage - employeesPerPage;
  
   
        const indexOfLastEmployee = Math.min(nextPage * employeesPerPage, totalEmployees);
  
     
        const nextCurrentEmployees = prevState.filteredEmployees.slice(
          indexOfFirstEmployee,
          indexOfLastEmployee
        );
  
        return {
          currentPage: nextPage,
          currentEmployees: nextCurrentEmployees,
          filteredEmployees: prevState.filteredEmployees,
        };
      });
    }
  };
  
  handlePrevPage = () => {
    const { currentPage } = this.state;
  
    if (currentPage > 0) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage - 1,
      }));
      this.updatePageInUrl(currentPage-1);
    }
  };
  updatePageInUrl = (page) => {
    const { selectedLocation, selectedDesignation, selectedDepartment } = this.state;
    const queryParams = queryString.stringify({
      location: selectedLocation,
      designation: selectedDesignation,
      department: selectedDepartment.join(','),
      page: (page+1).toString(),
    });
    this.props.history.push(`?${decodeURIComponent(queryParams)}`);
  };

  render() {
    const { selectedLocation, selectedDesignation, selectedDepartment, currentPage, employeesPerPage, filteredEmployees } = this.state;

    const totalEmployees = filteredEmployees.length;
    const indexOfLastEmployee =  Math.min(currentPage+1 * employeesPerPage, totalEmployees);
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);


    const lastPage = Math.ceil(totalEmployees / employeesPerPage);

    const employeeDetails = currentEmployees.map((employee) => (
      <div className='border' key={employee.id}>
        <h4>{employee.name}</h4>
        <p>Email: {employee.email}</p>
        <p>Mobile: {employee.mobile}</p>
        <p>Location: {employee.location}</p>
        <p>Department: {employee.department}</p>
        <p>Designation: {employee.designation}</p>
        <p>Salary: {employee.salary}</p>
      </div>
    ));

    return (
      <div className="">
    <div className='d-flex'>

        <div className="filters">
          <div>
            <h3>Designation</h3>
          
            <label>
              <input
                type="radio"
                name="designation"
                checked={selectedDesignation === 'Manager'}
                onChange={() => this.handleDesignationChange('Manager')}
              />
              Manager
            </label>
           <br/>
            <label>
              <input
                type="radio"
                name="designation"
                checked={selectedDesignation === 'Trainee'}
                onChange={() => this.handleDesignationChange('Trainee')}
              />
              Trainee
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="designation"
                checked={selectedDesignation === 'President'}
                onChange={() => this.handleDesignationChange('President')}
              />
              President
            </label>
          </div>

          <div>
            <h3>Department</h3>
            <label>
              <input
                type="checkbox"
                checked={selectedDepartment.includes('Finance')}
                onChange={() => this.handleDepartmentChange('Finance')}
              />
              Finance
            </label>
            <br/>
            <label>
              <input
                type="checkbox"
                checked={selectedDepartment.includes('Technology')}
                onChange={() => this.handleDepartmentChange('Technology')}
              />
              Technology
            </label>
            <br/>
            <label>
              <input
                type="checkbox"
                checked={selectedDepartment.includes('Operations')}
                onChange={() => this.handleDepartmentChange('Operations')}
              />
              Operations
            </label>
            <br/>
            <label>
              <input
                type="checkbox"
                checked={selectedDepartment.includes('HR')}
                onChange={() => this.handleDepartmentChange('HR')}
              />
              HR
            </label>
          </div>
        </div>
         
          <div style={{marginLeft:"50px"}}>
          <h2>Welcome to Employee Portal</h2>  
            <b> You have chosen</b>
            <p>Location :
            {selectedLocation}
          <br/>
            Department :
            {selectedDepartment.length === 0 ? 'All' : selectedDepartment.join(', ')}
            <br/>
            Designation : 
            {selectedDesignation === '' ? 'All' : selectedDesignation}
            <br/>
            </p>
            <div className='container'>
       <b>The number of employees matching the values :</b>
            {filteredEmployees.length}
        <div className="pagination ">
  
          {employeeDetails}
          <div className="pagination-buttons">
         
          </div>
        </div>
        <div>
            <button onClick={this.handlePrevPage} style={{float:"left"}} className='btn btn-primary'  disabled={currentPage === 0}>
              Prev
            </button>
            <button onClick={this.handleNextPage} style={{float:"right"}} className='btn btn-primary' disabled={currentPage === lastPage - 1}>
              Next
            </button>
            </div>
        </div>
          </div>
         
        
        </div>
      
      </div>
    );
  }
}

export default App1;