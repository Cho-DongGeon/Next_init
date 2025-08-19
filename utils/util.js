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