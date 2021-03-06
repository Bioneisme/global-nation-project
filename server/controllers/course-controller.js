const Course = require('../models/course-model')
const Lesson = require('../models/lesson-model')

class CourseController {
    async createCourse(req, res, next) {
        try {
            req.body.author = req.user
            Course.create(req.body, (err, course) => {
                if (err) return res.status(400).json({'message': 'Course with this title already exists!'})

                res.status(200).json({
                    'message': 'Course has been successfully created',
                    'id': course._id
                })
            })
        } catch (e) {
            next(e)
        }
    }

    async getCourse(req, res, next) {
        try {
            const id = req.params.id
            Course.findById(id, (err, course) => {
                if (err)
                    return res.status(404).json({'message': 'Course with this ID doesnt exists'})

                // TODO: load only user-readable information
                res.status(200).json(course)
            }).populate('author')
        } catch (e) {
            next(e)
        }
    }

    async getCourseToEdit(req, res, next) {
        try {
            const id = req.params.id
            Course.findById(id, (err, course) => {
                if (err)
                    return res.status(404).json({'message': 'Course with this ID doesnt exists'})
                if (!course.author.equals(req.user))
                    return res.status(404).json({'message': 'You don\'t have access!'})

                res.status(200).json(course)
            }).populate('author')
        } catch (e) {
            next(e)
        }
    }

    async deleteCourse(req, res, next) {
        try {
            // TODO: Delete
        } catch (e) {
            next(e)
        }
    }

    async createLesson(req, res, next) {
        try {
            req.body.author = req.user
            Lesson.create(req.body, (err, lesson) => {
                if (err) return res.status(400).json({'message': 'Error!'})

                res.status(200).json({
                    'message': 'Lesson has been successfully created',
                    'id': lesson._id
                })
            })
        } catch (e) {
            next(e)
        }
    }

    async getLesson(req, res, next) {
        try {
            const id = req.params.id
            Lesson.findById(id, (err, lesson) => {
                if (err)
                    return res.status(404).json({'message': 'Lesson with this ID doesnt exists'})

                // TODO: load only user-readable information
                res.status(200).json(lesson)
            }).populate('author')
        } catch (e) {
            next(e)
        }
    }

    async getLessonToEdit(req, res, next) {
        try {
            const id = req.params.id
            Lesson.findById(id, (err, lesson) => {
                if (err)
                    return res.status(404).json({'message': 'Course with this ID doesnt exists'})
                if (!lesson.author.equals(req.user))
                    return res.status(404).json({'message': 'You don\'t have access!'})

                res.status(200).json(lesson)
            }).populate('author')
        } catch (e) {
            next(e)
        }
    }

    async deleteLesson(req, res, next) {
        try {
            // TODO: Delete
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CourseController()