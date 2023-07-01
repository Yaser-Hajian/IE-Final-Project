class OffCourseMapper {
  static toDto(course) {
    return {
      name: course.course_name,
      id: course.course_id,
      courseId: course.course_id,
    };
  }
  static toDtoBulk(courses) {
    return courses.map(OffCourseMapper.toDto);
  }
  static toPersistence(course) {
    return {
      course_name: course.name,
      course_id: course.courseId ?? course.id,
    };
  }
  static toPersistenceBulk(courses) {
    return courses.map(OffCourseMapper.toPersistence);
  }
}

module.exports = OffCourseMapper;
