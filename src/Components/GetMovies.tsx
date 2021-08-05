import React, {useEffect, useState} from "react";
import {useLazyQuery, useMutation} from '@apollo/client';
import {LOAD_MOVIES} from '../GraphQL/Queries';
import {Link} from 'react-router-dom';
import {Box, Button, Snackbar} from "@material-ui/core";
import {DELETE_MOVIE_MUTATION, EDIT_MOVIE_MUTATION} from "../GraphQL/Mutations";
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import styled from 'styled-components';
import TextField from "@material-ui/core/TextField";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';


interface movieType {
    id: string;
    name: string;
    genre?: string
}


const rand = () => {
    return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const GetMovies = () => {
    // const {error, loading, data} = useQuery(LOAD_MOVIES);
    const [getMovies, {error, loading, data}] = useLazyQuery(LOAD_MOVIES);
    const [movies, setMovies] = useState<movieType[]>([]);
    const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION);
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [updateMovie] = useMutation(EDIT_MOVIE_MUTATION);
    const [movie, setMovie] = useState<movieType | null>(null);


    useEffect(() => {

        if (data) {
            setMovies(data.movies);
        }
    }, [data]);

    const removeMovie = (id: string) => {
        deleteMovie({
            variables: {
                id: id
            },
            refetchQueries: [{query: LOAD_MOVIES}]
        });

        if (error) {
            console.log(error);
        }

   
    };


    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />
    };


    const handleOpen = () => {
        setOpen(true);
    };

    const handleUpdateOpen = () => {
        setOpenUpdateForm(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    const alertHandleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setDeleteAlert(false);
    };

    const handleUpdateClose = () => {
        setOpenUpdateForm(false);
    };

    const updateMovieNamehandler = (id: string = "", name: string) => {
        updateMovie({
            variables: {
                id: id,
                name: name,
            },
            refetchQueries: [{query: LOAD_MOVIES}]
        });
    };



    // if (movie) return <p>Loading ...</p>;


    return (
        <>
            <Button color="secondary" onClick={() => getMovies()}>
                Click me to print all movies!
            </Button>
            {movies.map((val: movieType) => {
                return (
                    <MovieOption>
                        <Link to={`editMovieForm/${val.id}`} style={{textDecoration: 'none'}}>
                            <MovieName key={val.id}>{val.name} - <span>{val.genre}</span></MovieName>
                        </Link>
                        <Button color={"secondary"} type="button" onClick={handleOpen}>
                            Delete
                        </Button>
                        <Button color={"primary"} type="button" onClick={() => {
                            handleUpdateOpen()
                            setMovie({
                                id: val.id,
                                name: val.name,
                            })
                        }}>
                            Edit
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div style={modalStyle} className={classes.paper}>
                                <h2 id="simple-modal-title">Warning</h2>
                                <p id="simple-modal-description">
                                    Are you sure about that?.
                                </p>
                                <Button
                                    id={val.id}
                                    key={val.id}
                                    color={"secondary"}
                                    // onClose={handleClose}

                                    onClick={() => {
                                        removeMovie(val.id);
                                        handleClose();
                                        // deleteMovieAlert();
                                    }}>
                                    Delete
                                </Button>

                            </div>
                        </Modal>
                        <Snackbar open={deleteAlert} autoHideDuration={6000} onClose={alertHandleClose}>
                            <Alert onClose={alertHandleClose} severity="success">
                                This is a success message!
                            </Alert>
                        </Snackbar>


                        <Modal
                            open={openUpdateForm}
                            onClose={handleUpdateClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div style={modalStyle} className={classes.paper}>
                                <h2 id="simple-modal-title">Update Film</h2>
                                <p id="simple-modal-description">
                                    Update Film?.
                                </p>
                                <TextField
                                    type="text"
                                    placeholder="Name"
                                    defaultValue={movie?.name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />

                                <TextField
                                    type="text"
                                    placeholder="genre"
                                    defaultValue={movie?.genre}
                                    onChange={(e) => {
                                        setGenre(e.target.value);
                                    }}
                                />
                                <Button
                                    id={val.id}
                                    key={val.id}
                                    color={"primary"}
                                    // onClose={handleClose}

                                    onClick={() => {
                                        updateMovieNamehandler(movie?.id, name);
                                        handleUpdateClose();
                                    }}>
                                    Edit
                                </Button>
                            </div>
                        </Modal>
                    </MovieOption>

                )
            })}
            <Link to={`/createMovie`}>
                <p>Create movie</p>
            </Link>

        </>
    )
};


export default GetMovies;

const MovieName = styled.h3`
  color: rgba(105, 105, 105, 0.95);
  cursor: pointer;
  margin-bottom: 5px;
  margin-right: 10px;


  &:hover {
    color: rgba(30, 30, 30, 0.95);
  }
`;

const MovieOption = styled(Box)`
  display: flex;
  margin: 0 auto;
`;

