class SemCourseMapper {
  static toDto(course) {
    return {
      name: course.course_name,
      professor: course.professor,
      registrations: course.registrations,
      capacity: course.capacity,
      occupiedCapacity: course.registrations.length,
      id: course._id,
      classTimes: course.class_times,
      examTime: course.exam_time,
      courseId: course.course_id,
    };
  }
  static toDtoBulk(courses) {
    return courses.map(SemCourseMapper.toDto);
  }
  static toPersistence(course) {
    const registrations = {
      registrations: [],
    };
    if (course.registrations != null) {
      // use registration mapper
    }
    return {
      course_name: course.name,
      professor: course.professor,
      ...registrations,
      capacity: course.capacity,
      class_times: course.classTimes,
      exam_time: course.examDate,
      course_id: course.courseId ?? course.id,
    };
  }
  static toPersistenceBulk(terms) {
    return {};
  }
}

module.exports = SemCourseMapper;
