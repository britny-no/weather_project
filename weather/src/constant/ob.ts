// 실시간성 고려해 db에 저장후, redis/memory를 통해 실시간성 제공
export const topDownOb: Record<string, string[]> = {
  서울: ["관악구", "강남구", "용산구"],
  경기: ["수원시", "성남시"],
  경상: ["경상남도", "경상북도"],
  경상남도: ["진주시", "창원시", "함양군"],
  경상북도: ["포항시", "경주시", "구미시"],
  관악구: ["낙성대동", "신림동", "보라매동"],
  강남구: ["청담동", "논현동", "압구정동"],
  용산구: ["문배동", "원효로1동", "원효로2동"],
  수원시: ["장안구", "권선구", "영통구"],
  장안구: ["영화동", "파장동", "연무동"],
  권선구: ["평동", "구온동", "곡선동"],
  영통구: ["영통1동", "영통2동", "매탄2동"],
  성남시: ["분당구", "수정구", "중원구"],
  분당구: ["서현1동", "이매1동", "야탄1동"],
  수정구: ["고등동", "단대동", "신촌동"],
  중원구: ["성남동", "중앙동", "도촌동"],
  진주시: ["대평면", "금선면", "명석면"],
  창원시: ["마산합포구", "마산회원구"],
  마산합포구: ["자산동", "월영동", "오동동"],
  마산회원구: ["양덕동", "석전동"],
  함양군: ["함양읍", "마천면"],
  포항시: ["남구", "북구"],
  경주시: [],
  구미시: [],
  낙성대동: [],
  신림동: [],
  보라매동: [],
  청담동: [],
  논현동: [],
  압구정동: [],
  문배동: [],
  원효로1동: [],
  원효로2동: [],
  영화동: [],
  파장동: [],
  연무동: [],
  평동: [],
  구온동: [],
  곡선동: [],
  영통1동: [],
  영통2동: [],
  메탄2동: [],
  서현1동: [],
  이매1동: [],
  야탄1동: [],
  고등동: [],
  단대동: [],
  신촌동: [],
  성남동: [],
  중앙동: [],
  도촌동: [],
  대평면: [],
  금석면: [],
  명석면: [],
  자산동: [],
  월영동: [],
  오동동: [],
  양덕동: [],
  석전동: [],
  함양읍: [],
  마천면: [],
};

export const bottomUpOb: Record<string, string | null> = {
  서울: null,
  경기: null,
  경상: null,
  낙성대동: "관악구",
  신림동: "관악구",
  보라매동: "관악구",
  관악구: "서울",
  청담동: "강남구",
  논현동: "강남구",
  압구정동: "강남구",
  강남구: "서울",
  문배동: "용산구",
  원효로1동: "용산구",
  원효로2동: "용산구",
  용산구: "서울",
  영화동: "장안구",
  파장동: "장안구",
  연무동: "장안구",
  장안구: "수원시",
  수원시: "경기",
  평동: "권선구",
  구온동: "권선구",
  곡선동: "권선구",
  권선구: "수원시",
  영통1동: "영통구",
  영통2동: "영통구",
  매탄2동: "영통구",
  영통구: "수원시",
  서현1동: "분당구",
  이매1동: "분당구",
  야탄1동: "분당구",
  분당구: "성남시",
  성남시: "경기",
  고등동: "수정구",
  단대동: "수정구",
  신촌동: "수정구",
  수정구: "성남시",
  성남동: "중원구",
  중앙동: "중원구",
  도촌동: "중원구",
  중원구: "성남시",
  대평면: "진주시",
  금선면: "진주시",
  명석면: "진주시",
  진주시: "경상남도",
  경상남도: "경상",
  자산동: "마산합포구",
  월영동: "마산합포구",
  오동동: "마산합포구",
  마산합포구: "창원시",
  창원시: "경상남도",
  양덕동: "마산회원구",
  석전동: "마산회원구",
  마산회원구: "창원시",
  함양읍: "함양군",
  마천면: "함양군",
  함양군: "경상남도",
  남구: "포항시",
  북구: "포항시",
  포항시: "경상북도",
  경상북도: "경상",
  경주시: "경상북도",
  구미시: "경상북도",
};

// export const depthOneOb = {
//   서울: ["관악구", "강남구", "용산구"],
//   경기: ["수원시", "성남시"],
//   경상: ["경상남도", "경상북도"],
//   경상남도: ["진주시", "창원시", "함양군"],
//   경상북도: ["포항시", "경주시", "구미시"],
// };

// export const depthTwoOb = {
//   관악구: ["낙성대동", "신림동", "보라매동"],
//   강남구: ["청담동", "논현동", "압구정동"],
//   용산구: ["문배동", "원효로1동", "원효로2동"],
//   수원시: ["장안구", "권선구", "영통구"],
//   장안구: ["영화동", "파장동", "연무동"],
//   권선구: ["평동", "구온동", "곡선동"],
//   영통구: ["영통1동", "영통2동", "매탄2동"],
//   성남시: ["분당구", "수정구", "중원구"],
//   분당구: ["서현1동", "이매1동", "야탄1동"],
//   수정구: ["고등동", "단대동", "신촌동"],
//   중원구: ["성남동", "중앙동", "도촌동"],
//   진주시: ["대평면", "금선면", "명석면"],
//   창원시: ["마산합포구", "마산회원구"],
//   마산합포구: ["자산동", "월영동", "오동동"],
//   마산회원구: ["양덕동", "석전동"],
//   함양군: ["함양읍", "마천면"],
//   포항시: ["남구", "북구"],
//   경주시: [],
//   구미시: [],
// };

// export const depthThreeOb = {
//   낙성대동: [],
//   신림동: [],
//   보라매동: [],
//   청담동: [],
//   논현동: [],
//   압구정동: [],
//   문배동: [],
//   원효로1동: [],
//   원효로2동: [],
//   영화동: [],
//   파장동: [],
//   연무동: [],
//   평동: [],
//   구온동: [],
//   곡선동: [],
//   영통1동: [],
//   영통2동: [],
//   메탄2동: [],
//   서현1동: [],
//   이매1동: [],
//   야탄1동: [],
//   고등동: [],
//   단대동: [],
//   신촌동: [],
//   성남동: [],
//   중앙동: [],
//   도촌동: [],
//   대평면: [],
//   금석면: [],
//   명석면: [],
//   자산동: [],
//   월영동: [],
//   오동동: [],
//   양덕동: [],
//   석전동: [],
//   함양읍: [],
//   마천면: [],
// };