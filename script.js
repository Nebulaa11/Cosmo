let employees = JSON.parse(localStorage.getItem('employees')) || [];

function showEmployeeListing() {
    document.getElementById('employee-listing').classList.remove('hidden');
    document.getElementById('employee-details').classList.add('hidden');
    document.getElementById('add-employee').classList.add('hidden');
    renderEmployeeList();
}

function showAddEmployeePage() {
    document.getElementById('employee-listing').classList.add('hidden');
    document.getElementById('employee-details').classList.add('hidden');
    document.getElementById('add-employee').classList.remove('hidden');
}

function showEmployeeDetails(emp_id) {
    const employee = employees.find(emp => emp.emp_id === emp_id);
    if (employee) {
        document.getElementById('employee-info').innerHTML = `
            <p><strong>Name:</strong> ${employee.name}</p>
            <p><strong>Address:</strong> ${employee.address.line1}, ${employee.address.city}, ${employee.address.country}, ${employee.address.zip}</p>
            <p><strong>Contact:</strong> ${employee.contacts.map(contact => `${contact.contact_method}: ${contact.value}`).join(', ')}</p>
        `;
        document.getElementById('employee-listing').classList.add('hidden');
        document.getElementById('employee-details').classList.remove('hidden');
        document.getElementById('add-employee').classList.add('hidden');
    }
}

function renderEmployeeList() {
    const employeeListDiv = document.getElementById('employee-list');
    employeeListDiv.innerHTML = '';

    if (employees.length === 0) {
        employeeListDiv.innerHTML = '<p>No Employees in the system</p>';
    } else {
        employees.forEach(employee => {
            const employeeItem = document.createElement('div');
            employeeItem.classList.add('employee-item');
            employeeItem.innerHTML = `
                <p><strong>${employee.name}</strong> (ID: ${employee.emp_id})</p>
                <button onclick="deleteEmployee(${employee.emp_id})">Delete</button>
            `;
            employeeItem.onclick = () => showEmployeeDetails(employee.emp_id);
            employeeListDiv.appendChild(employeeItem);
        });
    }
}

function deleteEmployee(emp_id) {
    employees = employees.filter(emp => emp.emp_id !== emp_id);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderEmployeeList();
}

document.getElementById('employee-form').onsubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = {
        line1: document.getElementById('address-line1').value,
        city: document.getElementById('city').value,
        country: document.getElementById('country').value,
        zip: document.getElementById('zip').value
    };
    const contacts = [{
        contact_method: document.getElementById('contact-method').value,
        value: document.getElementById('contact-value').value
    }];
    const emp_id = new Date().getTime();
    employees.push({ emp_id, name, address, contacts });
    localStorage.setItem('employees', JSON.stringify(employees));
    showEmployeeListing();
}

window.onload = showEmployeeListing;
