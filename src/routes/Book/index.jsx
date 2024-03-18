import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from "@mui/material";
import { Link } from 'react-router-dom';

//Importing Components
import Header from '../../components/Header';
import BookList from '../../components/Book/BookList';
import Copyright from '../../components/Copyright';

const Book = () => {
    const [book, setBook] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        console.log("The All Books Data is ==> ", book);
    });

    useEffect(() => {
        getBooks();
    }, []);

    function getBooks() {
        fetch('http://localhost:8080/book')
            .then(response => {
                return response.text();
            })
            .then(data => {
                let parsedData = JSON.parse(data);
                setBook(parsedData);
                setStatus(true);
            }).catch(err => {
                console.log("Error While Fetching Book Table Data ==>", err);
            });
    }

    return (
        <>
            <Header />
            <img src="/cover.jpg" alt="Cover" width={"100%"} height={"300px"} />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        PERN STACK Application |  <Typography variant="inherit" color={"cadetblue"} component="span" gutterBottom>You can View/Edit or Delete the Books Data here</Typography>
                    </Typography>

                    {(status) ? (
                        <>
                            {
                                book.map((v, i) => {
                                    return (
                                        <Box key={i}>
                                            <BookList
                                                id={v.id}
                                                book_name={v.book_name}
                                                author={v.author}
                                                borrowed_by={v.borrowed_by}
                                                borrowed_date={v.borrowed_date}
                                                return_date={v.return_date}
                                                book={book}
                                                setBook={setBook}
                                            />
                                        </Box>
                                    )
                                })
                            }
                        </>
                    ) : (
                        <Box alignItems={"center"} textAlign={"center"} component={"div"}>
                            <br />
                            <Typography variant="h5" component="h5" textAlign={"center"} gutterBottom>....Data is being Loaded Please wait</Typography>
                            <br />
                            <CircularProgress size={"5rem"} />
                        </Box>
                    )}

                    <br />
                    <br />

                </Box>
            </Container>
            <hr />
            <br />
            <Copyright />
            <br />
        </>
    );
}
export default Book;