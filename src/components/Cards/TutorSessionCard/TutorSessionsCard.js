import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { React, useState, useEffect, useRef } from 'react';
import MuiButton from '../../Buttons/Button';
import api from '../../../services/api/index.js';
import sessionCardFields from './SessionCardFields';
import {
  Card,
  Box,
  CardContent,
  FormControl,
  FormLabel,
  TextField,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Menu,
  Button,
} from '@mui/material';
import useStyles from './style';

function TutorSessionsCard({ session, sessionId, onDelete }) {
  const { classes } = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [editedSession, setEditedSession] = useState(session);
  const [studentList, setStudentList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [anchorElement, setAnchorElement] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleClick = () => {
    setAnchorElement(event.currentTarget);
    setIsMenuOpen(true);
  };
  const handleClose = () => {
    setAnchorElement(null);
    setIsMenuOpen(false);
  };
  useEffect(() => {
    setEditedSession(session); // Mettre à jour editedSession lorsque session change
  }, [session]); // Utiliser un effet pour surveiller les changements dans la session

  useEffect(() => {
    // Récupérer les étudiants inscrits à la session spécifique lors du chargement initial
    const fetchRegisteredStudents = async () => {
      try {
        const response = await api.get(
          `/tutors/sessions/${sessionId}/students`,
        );
        setStudentList(response.data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des étudiants inscrits :',
          error,
        );
      }
    };

    fetchRegisteredStudents();
  }, [sessionId]);

  console.log('studentList :', studentList);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedSession({
      ...editedSession,
      [name]: value,
    });
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    setEditMode(false);
    try {
      const formattedDate = new Date(editedSession.date)
        .toISOString()
        .split('T')[0];
      const updatedSession = {
        ...editedSession,
        date: formattedDate, // Mettre à jour la propriété date avec la date formatée
      };
      // Envoie de la requête pour la mise à jour de la session
      await api.put(`/tutors/sessions/${sessionId}`, updatedSession);
      console.log('Session mise à jour avec succès');

      // Mettre à jour l'état `tutorSessions` dans le composant `Sessions`
      setTutorSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId ? updatedSession : session,
        ),
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la session', error);
    }
  };

  const handleConfirmatonMessage = () => {
    setConfirmationMessage(
      'Suppréssion impossible, des étudiants sont inscrits à cette session',
    );
    setTimeout(() => {
      setConfirmationMessage('');
    }, 3000);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        {editMode ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            margin="auto"
            borderRadius="10px"
            padding="15px"
          >
            <Typography variant="h4" marginBottom="15px">
              Mise à jour de la session
            </Typography>
            <form onSubmit={handleSaveClick}>
              <FormControl
                sx={{
                  display: 'flex',
                  width: '95%',
                  gap: '20px',
                  flexDirection: 'column',
                  padding: '10px',
                  borderRadius: '15px',
                }}
              >
                {sessionCardFields.map((field) => (
                  <Stack key={field.name}>
                    <FormLabel>{field.label}</FormLabel>
                    <TextField
                      type={field.type}
                      name={field.name}
                      value={editedSession[field.name]}
                      onChange={handleInputChange}
                      required
                    />
                  </Stack>
                ))}

                {/* Afficher les étudiants inscrits */}
                <Typography variant="h6">Étudiants inscrits :</Typography>
                <ul>
                  {studentList.map((student) => (
                    <li key={student.id}>{student.first_name}</li>
                  ))}
                </ul>

                <Box
                  display="flex"
                  justifyContent="center"
                  gap="1rem"
                  marginTop="2rem"
                >
                  <MuiButton type="submit">Sauvegarder</MuiButton>
                  <MuiButton onClick={() => setEditMode(false)}>
                    Annuler
                  </MuiButton>
                </Box>
              </FormControl>
            </form>
          </Box>
        ) : (
          <Box position="relative">
            {sessionCardFields.map((field) => (
              <Typography key={field.name} className={classes.text}>
                {field.label}: {session[field.name]}
              </Typography>
            ))}

            <Box display="flex" gap="20px">
              <MuiButton onClick={() => setEditMode(true)}>Modifier</MuiButton>
              {studentList.length > 0 ? (
                <MuiButton onClick={() => onDelete(session.id)}>
                  Annuler
                </MuiButton>
              ) : (
                <MuiButton onClick={() => onDelete(session.id)}>
                  Supprimer
                </MuiButton>
              )}
            </Box>
          </Box>
        )}

        <Accordion className={classes.accordion}>
          {/* <Button>Open Menu</Button> */}
          <AccordionDetails
            ref={anchorRef}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.accordionDetails}
          >
            <Typography>Étudiants inscrits :</Typography>
            <Typography
              className={
                studentList.length > 0 ? classes.greenSpan : classes.orangeSpan
              }
            >
              {studentList.length}
            </Typography>
          </AccordionDetails>
          {studentList.length > 0 ? (
            <Menu
              id="simple-menu"
              anchorEl={anchorRef.current}
              open={isMenuOpen}
              onClose={handleClose}
            >
              {studentList.map((student) => (
                <MenuItem key={student.id} onClick={handleClose}>
                  {student.first_name}
                </MenuItem>
              ))}
            </Menu>
          ) : (
            <Typography>Aucun étudiant inscrit.</Typography>
          )}
        </Accordion>
      </CardContent>
      {/* Affichage du message de confirmation */}
      {confirmationMessage && (
        <Box className={classes.confirmationMessage}>
          <Typography variant="body1">{confirmationMessage}</Typography>
        </Box>
      )}
    </Card>
  );
}

export default TutorSessionsCard;

// const handleDeleteSession = async (sessionId) => {
//   try {
//     // Récupérer les étudiants inscrits à la session spécifique
//     const response = await api.get(`tutors/sessions/${sessionId}/students`);

//     // Si des étudiants sont inscrits, mettre à jour le statut à "Annuler"
//     if (response.data.length > 0) {
//       await api.put(`tutors/sessions/${sessionId}/status`, {
//         status: 'Annuler',
//       });

//       // Mettez à jour l'état tutorSessions localement
//       setTutorSessions((prevSessions) =>
//         prevSessions.map((session) =>
//           session.id === sessionId
// ? { ...session, status: 'Annuler' }
//             : session,
//         ),
//       );
//     } else {
//       // Si aucun étudiant inscrit, supprimez la session en appelant la fonction onDelete passée en tant que prop
//       onDelete(sessionId);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

{
  /* <Accordion
          sx={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            border: '1px solid green',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Étudiants inscrits</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.studentListAccordion}>
            {studentList.length > 0 ? (
              <ul className={classes.studentList}>
                {studentList.map((student) => (
                  <li key={student.id}>{student.first_name}</li>
                ))}
              </ul>
            ) : (
              <Typography>Aucun étudiant inscrit.</Typography>
            )}
          </AccordionDetails>
        </Accordion> */
}
