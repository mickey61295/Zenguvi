import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { API } from './global'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { TextField } from '@mui/material'

const movieValidationSchema = yup.object({
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

export function EditMovieDetails() {
	const { id } = useParams()
	const [movie, setMovie] = useState()
	useEffect(() => {
		fetch(`${API}/${id}`)
			.then((data) => data.json())
			.then((data) => setMovie(data))
	}, [id])

	return movie ? <EditMovieForm movie={movie} /> : 'Loading...'
}

function EditMovieForm({ movie }) {
	const id = movie.id
	const navigate = useNavigate()
	const editMovie = (values) => {
		fetch(`${API}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
			.then((data) => data.json())
			.then(() => navigate('/movies'))
	}
	const formik = useFormik({
		initialValues: {
			name: movie.name,
			poster: movie.poster,
			rating: movie.rating,
			summary: movie.summary,
			trailer: movie.trailer,
		},
		validationSchema: movieValidationSchema,
		onSubmit: (values) => {
			editMovie(values)
		},
	})
	return (
		<form onSubmit={formik.handleSubmit} className="AddMovie">
			<TextField
				fullWidth
				label="name"
				variant="standard"
				name="name"
				value={formik.values.name}
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
				value={formik.values.poster}
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
				value={formik.values.rating}
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
				value={formik.values.summary}
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
				value={formik.values.trailer}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.trailer && formik.errors.trailer}
				helperText={
					formik.touched.trailer && formik.errors.trailer
						? formik.errors.trailer
						: ''
				}
			/>
			<Button type="submit" color="success" variant="contained">
				Save
			</Button>
		</form>
	)
}
