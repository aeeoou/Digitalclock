// 달력 JS
let date = new Date();                                                                             // 현재 날짜와 시간을 기반으로 나타내는 JS의 Date객체를 생성

const renderCalendar = () => {                                                                     // 'renderCalendar' 함수를 정의한다. 이 함수는 현재 날짜를 기반으로 달력을 렌더링하고 HTML에 표시하는 역할
    const viewYear = Date.getFullYear();                                                           // 'date' 객체에서 현재 년도를 가져와서 'viewYear' 상수에 저장, 'getFullYear()' 메서드는 년도를 반환한다.
    const viewMonth = Date.getMonth();                                                             // 'date' 객체에서 현재 월을 가져와서 'viewMonth' 상수에 저장, 'getMonth()' 메서드는 0~11까지의 값을 반환하므로, 실제 월을 표시하기 위해 +1을 더해준다.
    
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;        // 달력 상단의 연도와 월을 나타내는 요소의 텍스트 내용을 업데이트
    
    const prevLast = new Date(viewYear, viewMonth, 0);                                             // 이전 달의 마지막 날짜와 현재 달의 마지막 날짜를 나타내는 'Date' 객체 생성
    const thisLast = new Date(viewYear, viewMonth + 1, 0);
    
    const PLDate = prevLast.getDate();                                                             // 이전 달의 마지막 날짜(PLDate)와 요일(PLDay)을 가져온다.
    const PLDay = prevLast.getDay();
    
    const TLDate = thisLast.getDate();                                                             // 현재 달의 마지막 날짜와 요일을 가져온다.
    const TLDay = thisLast.getDay();
    
    const prevDates = [];                                                                          // 이전(prev), 현재(this), 다음(next) 달의 날짜를 담을 배열을 선언
    const thisDates = [...Array(TLDate +1).keys()].slice(1);
    const nextDates = [];
    
    if (PLDay !==6) {                                                                             // 이전 달의 마지막 날이 토요일(6)이 아닌 경우, 이전 달의 날짜를 배열에 추가한다.
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }
    
    for (let i = 1; i < 7 - TLDay; i++) {                                                        // 다음 달의 시작 날짜부터 다음 달의 마지막 날까지의 날짜를 배열에 추가한다.
        nextDates.push(i);
    }
    
    const dates = prevDates.concat(thisDates, nextDates);                                          // 이전, 현재, 다음 달의 날짜를 합쳐서 하나의 배열로 만든다. 그리고 첫 번째 날의 인덱스와 마지막날의 인덱스를 찾는다.
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate); 
    
    dates.forEach((date, i) => {                                                                   // 각 날짜에 대해 HTML 요소를 생성하고, 현재 달의 날짜에서 'this', 다른 날의 날짜에는 'other' 클래스를 부여한다. 그리고 이를 HTML에 삽입한다.
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
                          ? 'this'
                          : 'other';
        dates[i] = `<div class="date"> <span class="${condition}">${date}</span> </div>''`;
        });
        
        document.querySelector('.dates').innerHTML = dates.join('');                              
    };
    
    renderCalendar();                                                                              // 페이지 로드 시 'renderCalender' 함수를 호출하여 초기 달력을 표시한다.                                                                      
    
    const prevMonth = () => {                                                                      // 이전 달, 다음 달, 오늘 날짜로 이동하는 함수를 정의한다. 함수 내에서 'setMonth' 메서드를 사용하여 현재 월을 조절하고, 다시 'renderCalender' 함수를 호출하여 달력을 업데이트 한다.
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    };
    
    const nextMonth = () => {          
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    };
    
    const goToday = () => {                  
        date = new Date();
        renderCalendar();
    };



// 디지털 시계 JS
let handleId = 0;                              // handleId 라는 변수를 0으로 초기화 (시계가 계속해서 움직이는 동작을 만들었을 때,  그 동작에 대한 ID를 저장하는 변수)
const h1 = document.getElementById ("time");   // HTML 에서 'id'가 "time"인 요소를 찾아서 그 요소를 나타내는 'h1' 변수를 선언한다. (시간 표시에 사용)
const go = document.getElementById ("go");     // HTML 에서 'id'가 "go"인 요소를 찾아서 그 요소를 나타내는 'go' 변수를 선언한다. (시계의 시작 동작을 트리거하는데 사용)
const stop = document.getElementById ("stop"); // HTML 에서 'id'가 "stop"인 요소를 찾아서 그 요소를 나타내는 'stop' 변수를 선언한다. (시계의 정지 동작을 트리거하는데 사용)

function getTime1(){                                                // 현재 시간을 읽는 기능을 함수를 통해 구현
    const date = new Date();                                       // 현재 날짜 및 시간을 가져온다.
    const hour = date.getHours();                                  // 현재 시간에서 시간 부분을 가져온다.
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 현재 시간에서 분 부분을 가져온 후, 문자열로 변환하고, 필요한 경우 두 자리로 패딩한다. {.toString().padStart(2, '0'); 2가 두자릿수, '0' 한자릿 수 일때 0을 붙여라}
    const seconds = date.getSeconds().toString().padStart(2, '0'); // 현재 시간에서 초 부분을 가져온 후, 문자열로 변환하고, 필요한 경우 두 자리로 패딩한다. {.toString().padStart(2, '0'); 2가 두자릿수, '0' 한자릿 수 일때 0을 붙여라}
    const time = `${hour}:${minutes}:${seconds}`                   // 시간, 분, 초를 조합하여 시간 문자열을 생성한다. (!표 옆에 있는 백틱[`] 사용)
    h1.textContent = time;                                         // HTML 문서에서 id가 'h1'인 요소를 찾아 시간 문자열을 적용한다.
}
                                                 // 각 버튼의 동작에 대한 이벤트 핸들러 구현
go.onclick = function() {                        // go 버튼을 눌렀을 때 setInterval 메서드를 호출해 설정
    if (handleId == 0) {
        handleId = setInterval(getTime, 1000)    // 첫번째 인자로 전달되는 함수를 두번째 인자로 전달되는 숫자만큼의 주기를 가지고 동작
    }
}

stop.onclick = function() {                      // stop 버튼을 눌렀을 때 clearInterval 메서드를 호출해 설정
    clearInterval(handleId)
    handleId = 0;
}

