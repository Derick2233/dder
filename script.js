// 기록을 저장할 배열
let records = [];

// 화면에 기록을 추가하는 함수
function addRecord() {
    const date = document.getElementById('dateInput').value;
    const weight = document.getElementById('weightInput').value;

    // 입력값이 비어있는지 확인
    if (date.trim() === '' || weight.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: '입력 오류',
            text: '날짜와 몸무게를 입력하세요.',
        });
        return;
    }

    // 기록 객체 생성
    const record = { date, weight };

    // 배열에 기록 추가
    records.push(record);

    // 테이블 업데이트
    updateTable();

    // 입력 필드 초기화
    document.getElementById('dateInput').value = '';
    document.getElementById('weightInput').value = '';
}

// 테이블 업데이트 함수
function updateTable() {
    const tableBody = document.getElementById('recordTableBody');

    // 기존 테이블 내용 지우기
    tableBody.innerHTML = '';

    // 배열에 있는 기록을 테이블에 추가
    records.forEach((record, index) => {
        const row = tableBody.insertRow();

        // 날짜 셀
        const dateCell = row.insertCell(0);
        dateCell.innerHTML = record.date;

        // 누적 몸무게 셀
        const totalWeightCell = row.insertCell(1);
        const totalWeight = records.slice(0, index + 1).reduce((acc, record) => acc + parseFloat(record.weight), 0);
        totalWeightCell.innerHTML = totalWeight.toFixed(1) + ' kg';

        // 삭제 버튼 셀
        const deleteCell = row.insertCell(2);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.innerHTML = '삭제';
        deleteButton.onclick = () => deleteRecord(index);
        deleteCell.appendChild(deleteButton);
    });
}

// 기록 삭제 함수
function deleteRecord(index) {
    // 해당 인덱스의 기록 삭제
    records.splice(index, 1);

    // 테이블 업데이트
    updateTable();
}
