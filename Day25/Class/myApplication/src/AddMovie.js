import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { API } from './global'
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'

const movieValidationSchema = yup.object({
	email: yup
		.string()
		.min(4, 'Atleast 4 characters')
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i),
	name: yup.string().required('Name is required'),
	poster: yup
		.string()
		.min(4, 'Poster must be minimum 4 characters')
		.required('Poster is required'),
	rating: yup
		.number()
		.typeError('Rating must be a number')
		.min(0, 'Rating must be at least 0')
		.max(10, 'Rating cannot be greater than 10')
		.required('Rating is required'),
	summary: yup
		.string()
		.min(20, 'Summary must be at least 20 characters long')
		.required('Summary is required'),
	trailer: yup
		.string()
		.min(4, 'Trailer must be minimum 4 characters')
		.required('Trailer is required'),
})

export function AddMovie() {
	const createMovie = (values) => {
		const newMovie = values
		fetch(`${API}`, {
			method: 'POST',
			body: JSON.stringify(newMovie),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((data) => data.json())
			.then(() => formik.resetForm())
			.then(() => navigate('/movies'))
	}
	const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
			name: '',
			poster: '',
			rating: '',
			summary: '',
			trailer: '',
		},
		validationSchema: movieValidationSchema,
		onSubmit: (values) => {
			createMovie(values)
		},
	})

	return (
		<form onSubmit={formik.handleSubmit} className="AddMovie">
			<TextField
				fullWidth
				label="name"
				variant="standard"
				name="name"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.name && formik.errors.name}
				helperText={
					formik.touched.name && formik.errors.name ? formik.errors.name : ''
				}
			/>

			<TextField
				fullWidth
				variant="standard"
				name="poster"
				label="poster"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.poster && formik.errors.poster}
				helperText={
					formik.touched.poster && formik.errors.poster
						? formik.errors.poster
						: ''
				}
			/>

			<TextField
				fullWidth
				variant="standard"
				name="rating"
				label="rating"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.rating && formik.errors.rating}
				helperText={
					formik.touched.rating && formik.errors.rating
						? formik.errors.rating
						: ''
				}
			/>

			<TextField
				fullWidth
				variant="standard"
				name="summary"
				label="summary"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.summary && formik.errors.summary}
				helperText={
					formik.touched.summary && formik.errors.summary
						? formik.errors.summary
						: ''
				}
			/>

			<TextField
				fullWidth
				variant="standard"
				name="trailer"
				label="trailer"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.trailer && formik.errors.trailer}
				helperText={
					formik.touched.trailer && formik.errors.trailer
						? formik.errors.trailer
						: ''
				}
			/>

			<Button type="submit" variant="contained">
				Add Movie
			</Button>
		</form>
	)
}
