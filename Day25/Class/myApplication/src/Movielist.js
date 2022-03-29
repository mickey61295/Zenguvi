import Button from '@mui/material/Button'
import { useState } from 'react'
import { Profile } from './Movie'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { API } from './global'

export function Movielist() {
	const [movieList, setMovieList] = useState([])
	const getMovies = () => {
		fetch(`${API}`)
			.then((response) => response.json())
			.then((data) => setMovieList(data))
	}
	useEffect(() => getMovies(), [])

	const navigate = useNavigate()

	return (
		<div className="App">
			<div className="pageContainer">
				{movieList.map((item, index) => (
					<Profile
						key={item.id}
						movie={item}
						id={item.id}
						deleteButton={
							<Button
								onClick={() => {
									fetch(`${API}/${item.id}`, { method: 'DELETE' }).then(() =>
										getMovies()
									)
								}}
								className="deletebutton"
								color="error"
								aria-label="delete-button"
							>
								<DeleteIcon />
							</Button>
						}
						editButton={
							<Button
								onClick={() => {
									navigate('/movies/edit/' + item.id)
								}}
								className="deletebutton"
								color="secondary"
								aria-label="edit-button"
							>
								<EditIcon />
							</Button>
						}
					/>
				))}
			</div>
		</div>
	)
}
