export const EVALUATION_CRITERIA = {
  // Bài đánh giá 1 tháng
  '1_thang': {
    professionalAttitude: [
      { key: 'professionalAttitude', label: 'Professional Attitude & Behaviour / Thái độ & Hành vi chuyên nghiệp',
        descriptions: { 5: 'Thái độ chuyên nghiệp xuất sắc, làm gương cho others', 4: 'Thái độ chuyên nghiệp tốt', 3: 'Thái độ đạt yêu cầu', 2: 'Thái độ chưa tốt cần cải thiện', 1: 'Thái độ không chuyên nghiệp' }
      }
    ],
    professionalPerformance: [
      { key: 'workPerformance', label: 'Professional Performance / Thể hiện trong công việc',
        descriptions: { 5: 'Hoàn thành xuất sắc công việc', 4: 'Hoàn thành tốt công việc', 3: 'Hoàn thành đạt yêu cầu', 2: 'Hoàn thành dưới mức yêu cầu', 1: 'Không hoàn thành công việc' }
      }
    ],
    professionalKnowledge: [
      { key: 'professionalKnowledge', label: 'Professional Knowledge / Kiến thức chuyên môn',
        descriptions: { 5: 'Kiến thức chuyên môn xuất sắc', 4: 'Kiến thức chuyên môn tốt', 3: 'Kiến thức cơ bản đạt yêu cầu', 2: 'Kiến thức thiếu cần bổ sung', 1: 'Không có kiến thức chuyên môn' }
      }
    ],
    guestRelations: [
      { key: 'guestRelations', label: 'Guest Relations / Quan hệ khách hàng',
        descriptions: { 5: 'Tương tác với khách hàng xuất sắc', 4: 'Tương tác tốt với khách hàng', 3: 'Tương tác cơ bản với khách hàng', 2: 'Khó tương tác với khách hàng', 1: 'Không thể tương tác với khách hàng' }
      }
    ],
    communicationTeamwork: [
      { key: 'communicationTeamwork', label: 'Communication & Teamwork / Giao tiếp & Làm việc nhóm',
        descriptions: { 5: 'Giao tiếp và làm việc nhóm xuất sắc', 4: 'Giao tiếp và làm việc nhóm tốt', 3: 'Giao tiếp và làm việc nhóm đạt', 2: 'Giao tiếp và làm việc nhóm kém', 1: 'Không thể giao tiếp hoặc làm việc nhóm' }
      }
    ],
    languageSkills: [
      { key: 'languageSkills', label: 'Language Skills / Kỹ năng ngôn ngữ',
        descriptions: { 5: 'Giao tiếp tiếng Anh lưu loát', 4: 'Giao tiếp tiếng Anh tốt', 3: 'Giao tiếp tiếng Anh cơ bản', 2: 'Kỹ năng tiếng Anh hạn chế', 1: 'Kỹ năng tiếng Anh không thể giao tiếp cơ bản' }
      }
    ]
  },

  // Bài đánh giá 3 tháng & 6 tháng
  '3_thang_6_thang': {
    professional: [
      { key: 'followInstruction', label: 'Follow instruction / Làm theo chỉ dẫn',
        descriptions: { 5: 'Luôn tuân thủ và hoàn thành vượt mức chỉ dẫn', 4: 'Tuân thủ tốt các chỉ dẫn', 3: 'Làm theo chỉ dẫn cơ bản', 2: 'Thường xuyên không tuân thủ chỉ dẫn', 1: 'Từ chối hoặc không làm theo chỉ dẫn' }
      },
      { key: 'completesWork', label: 'Completes work assignments / Hoàn thành việc được giao',
        descriptions: { 5: 'Hoàn thành xuất sắc mọi công việc', 4: 'Hoàn thành tốt công việc được giao', 3: 'Hoàn thành cơ bản công việc', 2: 'Thường không hoàn thành đầy đủ', 1: 'Không hoàn thành công việc' }
      },
      { key: 'solvesProblems', label: 'Solves problems / Giải quyết vấn đề',
        descriptions: { 5: 'Giải quyết vấn đề sáng tạo, hiệu quả cao', 4: 'Giải quyết vấn đề tốt', 3: 'Giải quyết vấn đề cơ bản', 2: 'Không thể giải quyết không có hỗ trợ', 1: 'Không thể giải quyết dù có hỗ trợ' }
      },
      { key: 'communicatesOrally', label: 'Communicates orally / Giao tiếp trực tiếp',
        descriptions: { 5: 'Giao tiếp rõ ràng, mạch lạc', 4: 'Giao tiếp tốt, dễ hiểu', 3: 'Giao tiếp được nhưng chưa rõ ràng', 2: 'Giao tiếp khó hiểu', 1: 'Không thể giao tiếp hiệu quả' }
      }
    ],
    knowledge: [
      { key: 'hotelServicesKnowledge', label: "Displays basic knowledge and understanding of hotel's services / Thể hiện kiến thức cơ bản về dịch vụ khách sạn",
        descriptions: { 5: 'Hiểu biết toàn diện về dịch vụ KS', 4: 'Hiểu biết tốt về dịch vụ KS', 3: 'Hiểu biết cơ bản về dịch vụ KS', 2: 'Hiểu biết hạn chế về dịch vụ KS', 1: 'Không hiểu gì về dịch vụ KS' }
      },
      { key: 'growthInKnowledge', label: 'Has displayed growth in knowledge and understanding / Đã cho thấy sự phát triển về kiến thức',
        descriptions: { 5: 'Phát triển kiến thức rất nhanh', 4: 'Phát triển kiến thức nhanh', 3: 'Phát triển kiến thức đều đặn', 2: 'Phát triển kiến thức chậm', 1: 'Không có tiến bộ kiến thức' }
      },
      { key: 'practicalApplication', label: 'Ability to apply knowledge in a practical way / Khả năng áp dụng kiến thức vào thực tế',
        descriptions: { 5: 'Áp dụng thực tế xuất sắc', 4: 'Áp dụng thực tế tốt', 3: 'Áp dụng thực tế được', 2: 'Không thể áp dụng hiệu quả', 1: 'Không thể áp dụng kiến thức' }
      },
      { key: 'independentThinking', label: 'Ability to think independently / Khả năng suy nghĩ độc lập',
        descriptions: { 5: 'Tư duy độc lập xuất sắc', 4: 'Tư duy độc lập tốt', 3: 'Cần hỗ trợ để tư duy độc lập', 2: 'Phụ thuộc hoàn toàn', 1: 'Không có khả năng tư duy' }
      }
    ],
    behavior: [
      { key: 'courtesy', label: 'Courtesy - Guest relation / Lịch sự',
        descriptions: { 5: 'Luôn lịch sự, tôn trọng mọi người', 4: 'Lịch sự, tôn trọng người khác', 3: 'Lịch sự trong tình huống thông thường', 2: 'Đôi khi thiếu lịch sự', 1: 'Thường xuyên thiếu lịch sự' }
      },
      { key: 'appearance', label: 'Professional appearance / Dáng vẻ - Tác phong',
        descriptions: { 5: 'Tác phong hoàn hảo, gọn gàng', 4: 'Tác phong tốt, gọn gàng', 3: 'Tác phong cơ bản', 2: 'Tác phong chưa tốt', 1: 'Tác phong rất kém' }
      },
      { key: 'matureJudgements', label: 'Displays mature judgements / Thể hiện sự chín chắn',
        descriptions: { 5: 'Phán đoán xuất sắc, rất trưởng thành', 4: 'Phán đoán tốt, trưởng thành', 3: 'Phán đoán phù hợp độ tuổi', 2: 'Phán đoán chưa trưởng thành', 1: 'Phán đoán thiếu trưởng thành' }
      },
      { key: 'attendance', label: 'Attendance / Chuyên cần',
        descriptions: { 5: 'Rất chăm chỉ, làm việc nhiều hơn yêu cầu', 4: 'Siêng năng, chăm chỉ', 3: 'Làm việc đều đặn', 2: 'Làm việc không đều đặn', 1: 'Không siêng năng' }
      },
      { key: 'punctuality', label: 'Punctuality / Sự đúng giờ',
        descriptions: { 5: 'Luôn đúng giờ hoặc sớm hơn', 4: 'Thường đúng giờ', 3: 'Đúng giờ trong phần lớn trường hợp', 2: 'Thường xuyên muộn', 1: 'Liên tục muộn' }
      },
      { key: 'reliability', label: 'Reliability & Dependability / Tính đáng tin cậy',
        descriptions: { 5: 'Rất đáng tin cậy, luôn đúng hạn', 4: 'Đáng tin cậy, hiếm vấn đề', 3: 'Đáng tin cậy trong phần lớn trường hợp', 2: 'Đôi khi không đáng tin cậy', 1: 'Không đáng tin cậy' }
      },
      { key: 'enthusiasm', label: 'Enthusiasm for experience / Sự nhiệt tình',
        descriptions: { 5: 'Nhiệt tình cao độ, truyền cảm hứng', 4: 'Nhiệt tình với công việc', 3: 'Có nhiệt tình nhưng không ổn định', 2: 'Thiếu nhiệt tình', 1: 'Hoàn toàn kh��ng có nhiệt tình' }
      },
      { key: 'adaptability', label: 'Ability to adapt to a variety of tasks / Khả năng thích ứng',
        descriptions: { 5: 'Thích nghi xuất sắc với mọi môi trường', 4: 'Thích nghi tốt với thay đổi', 3: 'Thích nghi được với thay đổi cơ bản', 2: 'Khó thích nghi', 1: 'Không thể thích nghi' }
      },
      { key: 'accuracy', label: 'Attention to accuracy and details / Sự chính xác, tỉ mỉ',
        descriptions: { 5: 'Rất chính xác, ít sai sót', 4: 'Chính xác, hiếm sai sót', 3: 'Chấp nhận được, có sai sót nhỏ', 2: 'Nhiều sai sót', 1: 'Thường xuyên mắc lỗi' }
      },
      { key: 'willingnessGuidance', label: 'Willingness to ask for and use guidance / Sẵn sàng hỏi và sử dụng hướng dẫn',
        descriptions: { 5: 'Rất sẵn sàng học hỏi', 4: 'Sẵn sàng tiếp thu', 3: 'Tiếp thu khi được yêu cầu', 2: 'Không muốn tiếp thu', 1: 'Từ chối hướng dẫn' }
      },
      { key: 'acceptsSuggestions', label: 'Willingly accepts suggestions and criticism / Sẵn lòng chấp nhận góp ý',
        descriptions: { 5: 'Luôn tiếp nhận tích cực', 4: 'Tiếp nhận tốt', 3: 'Tiếp nhận khi được đề xuất', 2: 'Không tiếp nhận gợi ý', 1: 'Phản đối gợi ý' }
      },
      { key: 'followsRules', label: "Understand & follows hotel's rules and regulations / Hiểu và tuân thủ nội quy KS",
        descriptions: { 5: 'Tuân thủ tuyệt đối, làm gương', 4: 'Tuân thủ tốt', 3: 'Tuân thủ cơ bản', 2: 'Thường xuyên vi phạm', 1: 'Vi phạm nghiêm trọng' }
      }
    ],
    overall: [
      { key: 'preparation', label: "The trainee's preparation was sufficient / Sự chuẩn bị của học viên là đủ",
        descriptions: { 5: 'Chuẩn bị xuất sắc, đầy đủ', 4: 'Chuẩn bị tốt, đầy đủ', 3: 'Chuẩn bị cơ bản đủ', 2: 'Chuẩn bị chưa đủ', 1: 'Không có sự chuẩn bị' }
      },
      { key: 'behaviorOverall', label: "The trainee's behavior was appropriate and professional / Học viên có thái độ phù hợp",
        descriptions: { 5: 'Thái độ xuất sắc, chuyên nghiệp', 4: 'Thái độ tốt, chuyên nghiệp', 3: 'Thái độ phù hợp', 2: 'Thái độ chưa phù hợp', 1: 'Thái độ không phù hợp' }
      },
      { key: 'performanceOverall', label: "The trainee performed as well as or better than average entry-level staff / Thực hiện bằng hoặc hơn NV mới",
        descriptions: { 5: 'Vượt trội so với NV mới', 4: 'Tốt hơn NV mới', 3: 'Bằng mức NV mới', 2: 'Dưới mức NV mới', 1: 'Không đạt mức NV mới' }
      }
    ]
  }
};

export const getCriteriaByPeriod = (period) => {
  if (period === '1 tháng') {
    return EVALUATION_CRITERIA['1_thang'];
  }
  return EVALUATION_CRITERIA['3_thang_6_thang'];
};

export const getFlatCriteriaList = (period) => {
  const criteriaByPeriod = getCriteriaByPeriod(period);
  const allCriteria = [];
  
  Object.values(criteriaByPeriod).forEach(group => {
    if (Array.isArray(group)) {
      group.forEach(c => allCriteria.push(c));
    }
  });
  
  return allCriteria;
};

export const getScoreDescription = (criteriaKey, score) => {
  const allCriteria = [...Object.values(EVALUATION_CRITERIA['1_thang']).flat(), ...Object.values(EVALUATION_CRITERIA['3_thang_6_thang']).flat()];
  const criteria = allCriteria.find(c => c.key === criteriaKey);
  if (!criteria || !criteria.descriptions) return null;
  return criteria.descriptions[score];
};