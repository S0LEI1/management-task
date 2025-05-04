function addInput() {
  const stepCount =
    document.querySelectorAll('#step-group .form-group').length + 1;

  // Tạo div.form-group mới
  const formGroup = document.createElement('div');
  formGroup.className = 'form-group';
  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';
  // Tạo label
  const newLabel = document.createElement('label');
  newLabel.className = 'control-label step-label';
  newLabel.textContent = `Bước ${stepCount}:`;

  // Tạo input
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.className = 'form-control input-step';
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Xóa';
  deleteBtn.onclick = function () {
    removeInput(formGroup, inputGroup);
  };
  // Thêm label và input vào div.form-group
  formGroup.appendChild(newLabel);
  inputGroup.appendChild(newInput);
  inputGroup.appendChild(deleteBtn);
  formGroup.appendChild(inputGroup);
  // Thêm div.form-group vào inputContainer
  const inputContainer = document.getElementById('step-group');
  inputContainer.appendChild(formGroup);
  // inputContainer.appendChild(inputGroup);
}
function removeInput(formGroup, inputGroup) {
  // Xóa div.form-group
  formGroup.remove();
  inputGroup.remove();
  // Cập nhật lại số thứ tự của các label
  const formGroups = document.querySelectorAll('#step-group .form-group');
  formGroups.forEach((group, index) => {
    const label = group.querySelector('.control-label');
    if (label) {
      label.textContent = `Bước ${index + 1}:`;
    }
  });
}
function fetchUsers() {
  // Sử dụng JSONPlaceholder API để minh họa (thay bằng API thực tế của bạn)
  fetch('http://localhost:8080/v1/api/users', {
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
      'x-client-id': localStorage.getItem('userID'),
      'rtoken-id': localStorage.getItem('refreshToken'),
    },
  })
    .then((response) => response.json())
    .then((users) => {
      const userSelect = document.getElementById('user-dropdown');
      users.metadata.forEach((user) => {
        const option = document.createElement('option');
        option.value = user._id;
        option.textContent = user.name;
        userSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
      const userSelect = document.getElementById('userSelect');
      const option = document.createElement('option');
      option.textContent = 'Failed to load users';
      userSelect.appendChild(option);
    });
}
function getFormData() {
  const name = document
    .querySelector(".form-ad .form-group input[type='text']")
    .value.trim();

  const steps = [];
  const stepInputs = document.querySelectorAll('.input-step');
  stepInputs.forEach((input) => {
    if (input.value.trim()) {
      steps.push(input.value.trim());
    }
  });

  const receiver = document.getElementById('user-dropdown').value;

  const deadline = document.querySelector(".form-ad input[type='date']").value;
  const description = document.querySelector('.description + input').value;
  // Kiểm tra dữ liệu đầu vào nếu cần
  const formData = {
    name,
    steps,
    receiver,
    deadline,
    description,
  };

  console.log(formData); // hoặc gửi lên server

  return formData;
}
function createTask() {
  const { name, steps, receiver, deadline, description } = getFormData();
  fetch('http://localhost:8080/v1/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
      'x-client-id': localStorage.getItem('userID'),
      'rtoken-id': localStorage.getItem('refreshToken'),
    },
    body: JSON.stringify({
      name: name,
      steps: steps,
      receiver: receiver,
      deadline: deadline,
      description: description,
    }),
  })
    .then((response) => response.json())
    .then((task) => {
      console.log(task);
    })
    .catch((error) => {
      console.error('Error create task:', error);
    });
}
// Gọi hàm khi trang được tải

document.addEventListener('DOMContentLoaded', fetchUsers);
// window.onload = fetchUsers;
