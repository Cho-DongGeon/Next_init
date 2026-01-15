export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

export function getNowDateTime_hhmm() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate().toString().padStart(2, '0');
  const hour = today.getHours().toString().padStart(2, '0');
  const minute = today.getMinutes().toString().padStart(2, '0');
  return `${year}-${month.toString().padStart(2, '0')}-${day} ${hour}:${minute}`;
}

export function getNowDateTime_hhmmss() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate().toString().padStart(2, '0');
  const hour = today.getHours().toString().padStart(2, '0');
  const minute = today.getMinutes().toString().padStart(2, '0');
  const seconds = today.getSeconds().toString().padStart(2, '0');
  return `${year}-${month.toString().padStart(2, '0')}-${day} ${hour}:${minute}:${seconds}`;
}

//휴대전화번호 formatting 01012345678 => 010-1234-5678
export function formatPhone(phoneString) {
    phoneString = phoneString.replace(/\D/g, '');

    // 01012345678
    if (phoneString.length === 11) {
        return phoneString.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
}

//휴대전화번호 formatting 010-1234-5678 => 01012345678
export function unformatPhone(phoneString) {
    // 숫자 이외의 문자 제거
    phoneString = phoneString.replace(/\D/g, '');
    
    // 010-1234-5678 => 01012345678
    if (phoneString.length === 11) {
        return phoneString;
    }
    
    return phoneString; // 길이가 맞지 않는 경우 그대로 반환
}

// 날짜를 yyyy-mm-dd 형식으로 변환 (한국 시간대 기준)
export function formatDate(date) {
    if (!date) return null;

    const d = new Date(date);
    const kstOffset = 9 * 60; // 한국 시간대 UTC+9 (분 단위)
    const utcTime = d.getTime() + d.getTimezoneOffset() * 60000; // UTC 시간
    const kstTime = new Date(utcTime + kstOffset * 60000); // 한국 시간

    const year = kstTime.getFullYear();
    const month = String(kstTime.getMonth() + 1).padStart(2, '0');
    const day = String(kstTime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


// YYYY-MM-DD 형식의 날짜에 일수를 더한 날짜를 YYYY-MM-DD 형식으로 반환
export function addDaysToDate(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}