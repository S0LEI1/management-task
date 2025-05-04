function getTasks() {
  fetch('http://localhost:8080/v1/api/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
      'x-client-id': localStorage.getItem('userID'),
      'rtoken-id': localStorage.getItem('refreshToken'),
    },
  })
    .then((response) => response.json())
    .then((tasks) => {
      renderJobs(tasks.metadata);
    })
    .catch((error) => {
      console.error('Error create task:', error);
    });
}
function renderJobs(jobs) {
  const jobContainer = document.getElementById('task-list');
  console.log(jobs);

  // Map jobs to HTML template
  const jobsHtml = jobs
    .map((job) => {
      const statusClass = job.status === 'new' ? 'part-time' : 'full-time';
      console.log(job.createBy);
      return `
      <div class="job-list">
        <div class="thumb">
          <a href="job-details.html"><img src="assets/img/jobs/img-1.jpg" alt=""></a>
        </div>
        <div class="job-list-content">
          <h4><a href="job-details.html">${
            job.name
          }</a><span class="${statusClass}">${
        job.status === 'new' ? 'Mới' : 'Hoàn thành'
      }</span></h4>
          <p>${job.description}</p>
          <div class="job-tag">
          <div class="pull-left">
            <div class="meta-tag">
              <span><i class="ti-user"></i>Người giao: ${
                job.createBy.name
              }</span>
              <span><i  class="ti-pencil-alt"></i>Nhân viên: ${
                job.receiver.name
              }</span>
              <span><i class="ti-calendar"></i>${formatDateToDDMMYY(
                job.deadline
              )}</span>
            </div>
          </div>
          <div class="pull-right">
            <div class="btn btn-common btn-rm">Chi tiết</div>
          </div>
        </div>
      </div>
    </div>
  `;
    })
    .join('');

  // Insert HTML into container
  jobContainer.innerHTML = jobsHtml;
}
function formatDateToDDMMYY(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày, đảm bảo 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (0-11, nên +1), đảm bảo 2 chữ số
  const year = String(date.getFullYear()).slice(); // Lấy 2 chữ số cuối của năm
  return `${day}/${month}/${year}`;
}
window.onload = getTasks();
