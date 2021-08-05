import {gql} from "@apollo/client";

export const CREATE_MOVIE_MUTATION = gql`
    mutation addMovie($name: String!, $genre: String ) {
        addMovie(name: $name, genre: $genre) {
            name
            genre
        }
    }
`;

export const EDIT_MOVIE_MUTATION = gql`
    mutation updateMovie( $id:ID, $name: String!) {
        updateMovie(id:$id, name: $name) {
            id
            name

        }
    }
`;

export const DELETE_MOVIE_MUTATION = gql`
    mutation deleteMovie( $id:ID) {
        deleteMovie(id:$id) {
            id
            name
            genre
        }
    }
`;