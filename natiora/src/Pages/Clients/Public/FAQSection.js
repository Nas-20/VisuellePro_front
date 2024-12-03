import React, { useState } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQSection = () => {
  // Pour gérer l'ouverture/fermeture des sections FAQ
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          mb: 4, 
          fontFamily: 'Poppins, sans-serif' 
        }}
      >
        FAQ - Questions Fréquemment Posées
      </Typography>

      {/* FAQ 1 */}
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1-header">
          <Typography variant="h6">Comment puis-je personnaliser mes produits visuels ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Pour personnaliser vos produits visuels, cliquez sur le bouton "Personnaliser maintenant" sur la page d'accueil ou accédez à l'onglet "Personnalisation". Vous pourrez choisir le type de produit, la taille, les matériaux et télécharger vos fichiers ou ajouter du texte.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 2 */}
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2-header">
          <Typography variant="h6">Quels types de supports puis-je personnaliser ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Nous offrons une large gamme de supports à personnaliser, notamment les bannières, les enseignes, les habillages de véhicules, les affiches, les roll-ups, et bien plus. Vous pouvez consulter la liste complète des supports dans la section "Produits".
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 3 */}
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel3-header">
          <Typography variant="h6">Comment suivre ma commande après la personnalisation ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Une fois votre commande personnalisée, vous recevrez un email de confirmation avec un numéro de suivi. Vous pourrez suivre l'état de votre commande dans la section "Mes Commandes" de votre compte.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 4 */}
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel4-header">
          <Typography variant="h6">Comment puis-je créer un compte client ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Pour créer un compte, cliquez sur le bouton "S'inscrire" en haut à droite de la page. Remplissez le formulaire d'inscription avec vos informations, et une fois votre compte activé, vous pourrez accéder à toutes les fonctionnalités de la plateforme.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 5 */}
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel5-header">
          <Typography variant="h6">Quels sont les délais de production et de livraison ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Les délais de production dépendent du type de produit et de la quantité commandée. En général, la production prend entre 2 à 5 jours ouvrés. Une fois expédiée, la livraison prend environ 3 à 7 jours ouvrés. Vous recevrez un numéro de suivi pour suivre votre livraison.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 6 */}
      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel6-header">
          <Typography variant="h6">Quels sont les moyens de paiement disponibles ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Nous acceptons plusieurs moyens de paiement, y compris les cartes de crédit, PayPal, et les virements bancaires. Toutes les transactions sont sécurisées par notre système de paiement en ligne.
          </Typography>
        </AccordionDetails>
      </Accordion>

    </Container>
  );
};

export default FAQSection;
