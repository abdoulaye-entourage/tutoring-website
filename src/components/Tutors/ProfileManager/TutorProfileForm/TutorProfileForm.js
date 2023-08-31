import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instanceAxios from '../../../../services/axiosInterceptor';
import {
  Box,
  FormControl,
  TextField,
  Typography,
  Stack,
  FormLabel,
} from '@mui/material';
import Button from '../../../Buttons/Button';
import profileFormFields from './tutorProfilForm.shema';

function TutorProfileForm() {
  const [formData, setFormData] = useState({
    imageUrl: '',
    skills: '',
    experience: '',
    hourly_rate: '',
    availability: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageUrl' && files && files.length > 0) {
      setFormData({ ...formData, imageUrl: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Récupérer l'id de l'utilisateur à partir du localStorage
      const userId = localStorage.getItem('userId');
      // Créer un objet FormData pour envoyer les données du formulaire (y compris l'image)
      const formDataToSend = new FormData();
      formDataToSend.append('imageUrl', formData.imageUrl);
      formDataToSend.append('skills', formData.skills);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('hourly_rate', formData.hourly_rate);
      formDataToSend.append('availability', formData.availability);

      // Envoyer une requête POST au backend pour enregistrer le profil du tuteur
      const response = await instanceAxios.post(
        `/tutors/profile/${userId}`,
        formDataToSend,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data', // ajouter le Content-Type correct pour les envois multipart
          },
        },
      );
      console.log(response.data); // Un message de succès

      // Une fois le profil créé avec succès, rediriger l'utilisateur vers le tableau de bord
      navigate('/tutor-dashboard');
    } catch (error) {
      console.error(error); // Pour afficher toute erreur survenue lors de la requête
    }
  };

  return (
    <Box
      display="flex"
      paddingTop="80px"
      justifyContent="center"
      width="50%"
      margin="auto"
    >
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        sx={{ gap: '20px', width: '100%' }}
      >
        <Stack textAlign="center">
          <Typography variant="h5">Complétez votre profil</Typography>
        </Stack>

        <Stack>
          <FormLabel sx={{ fontSize: '19px', fontWeight: 'bold' }}>
            Télécharger une photo
          </FormLabel>
          <input
            type="file"
            name="imageUrl"
            id="imageUrl"
            onChange={handleChange}
          />
          {formData.imageUrl && <p>{formData.imageUrl.name}</p>}
        </Stack>

        {profileFormFields.map((element) => (
          <Stack key={element.name}>
            <FormLabel sx={{ fontSize: '19px', fontWeight: 'bold' }}>
              {element.label}
            </FormLabel>
            <TextField
              type={element.type}
              name={element.name}
              id={element.name}
              value={formData[element.name]}
              onChange={handleChange}
            />
          </Stack>
        ))}
        {/* <Stack>
        <FormLabel sx={{fontSize:'19px', fontWeight:'bold'}}>Télécharger une photo</FormLabel>
        <TextField  type="file" name="imageUrl" id="imageUrl" onChange={handleChange}/>
      </Stack>
      <Stack >
        <TextField name="skills" label='Compétences' id="skills" value={formData.skills} onChange={handleChange} />
      </Stack>
      <Stack>
        <TextField name="experience" label='Expériences' id="experience" value={formData.experience} onChange={handleChange} />
      </Stack>
      <Stack>
        <TextField type="text" label='Taux horaire' name="hourly_rate" id="hourly_rate" value={formData.hourly_rate} onChange={handleChange} />
      </Stack>
      <Stack>
        <TextField name="availability" label='Disponibilité' id="availability" value={formData.availability} onChange={handleChange} />
      </Stack> */}
        <Button type="submit">Soumettre</Button>
      </FormControl>
    </Box>
  );
}

export default TutorProfileForm;