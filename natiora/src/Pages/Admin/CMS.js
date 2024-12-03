import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from "@mui/icons-material";

const CMSManagement = () => {
  // Liste du contenu du site (données factices)
  const [contents, setContents] = useState([
    { id: 1, title: "Bienvenue sur notre site", section: "Page d'accueil", contentType: "Texte", status: "Publié", date: "01/10/2024", content: "Ceci est le contenu de la page d'accueil." },
    { id: 2, title: "Qui sommes-nous ?", section: "À propos", contentType: "Texte", status: "Publié", date: "15/09/2024", content: "Ceci est la page À propos." },
  ]);

  // État pour un nouveau contenu
  const [newContent, setNewContent] = useState({ title: "", section: "", contentType: "Texte", status: "Brouillon", content: "" });

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // État pour la prévisualisation
  const [previewContent, setPreviewContent] = useState(null);

  // État pour la suppression
  const [deleteContentId, setDeleteContentId] = useState(null);

  // Ajouter un nouveau contenu
  const addContent = () => {
    const newId = contents.length + 1;
    setContents([...contents, { id: newId, ...newContent, date: new Date().toLocaleDateString() }]);
    setNewContent({ title: "", section: "", contentType: "Texte", status: "Brouillon", content: "" });
  };

  // Modifier un contenu
  const handleEditContent = (content) => {
    setNewContent(content); // Charger le contenu à modifier
  };

  // Prévisualiser un contenu
  const handlePreviewContent = (content) => {
    setPreviewContent(content);
  };

  // Confirmer la suppression
  const confirmDeleteContent = (id) => {
    setDeleteContentId(id);
  };

  // Supprimer un contenu après confirmation
  const deleteContent = () => {
    setContents(contents.filter((content) => content.id !== deleteContentId));
    setDeleteContentId(null);
  };

  // Gérer les changements de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Gérer les changements de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container maxWidth={false} sx={{pt:2, borderRadius:5,pb:8, bgcolor:"#392e22 ", width:'100%'}}>
      <Typography variant="h5" gutterBottom sx={{color:"#fff",pt:3,pb:3}}>
        Gestion du Contenu (CMS)
      </Typography>

      <Grid container spacing={3}>
        {/* Formulaire d'ajout de contenu */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Ajouter un nouveau contenu</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Titre"
                  value={newContent.title}
                  onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id="section-label">Section</InputLabel>
                  <Select
                    labelId="section-label"
                    value={newContent.section}
                    label="Section"
                    onChange={(e) => setNewContent({ ...newContent, section: e.target.value })}
                  >
                    <MenuItem value="Page d'accueil">Page d'accueil</MenuItem>
                    <MenuItem value="À propos">À propos</MenuItem>
                    <MenuItem value="Articles">Articles</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id="content-type-label">Type de contenu</InputLabel>
                  <Select
                    labelId="content-type-label"
                    value={newContent.contentType}
                    label="Type de contenu"
                    onChange={(e) => setNewContent({ ...newContent, contentType: e.target.value })}
                  >
                    <MenuItem value="Texte">Texte</MenuItem>
                    <MenuItem value="Image">Image</MenuItem>
                    <MenuItem value="Vidéo">Vidéo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Statut</InputLabel>
                  <Select
                    labelId="status-label"
                    value={newContent.status}
                    label="Statut"
                    onChange={(e) => setNewContent({ ...newContent, status: e.target.value })}
                  >
                    <MenuItem value="Publié">Publié</MenuItem>
                    <MenuItem value="Brouillon">Brouillon</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {newContent.contentType === "Texte" && (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Contenu"
                    value={newContent.content}
                    onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                  />
                )}
                {newContent.contentType === "Image" && (
                  <TextField
                    fullWidth
                    label="URL de l'image"
                    value={newContent.content}
                    onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                  />
                )}
                {newContent.contentType === "Vidéo" && (
                  <TextField
                    fullWidth
                    label="URL de la vidéo"
                    value={newContent.content}
                    onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addContent}
                >
                  Ajouter Contenu
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Liste des contenus avec pagination */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ec8817" }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Titre</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Type de contenu</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((content) => (
                  <TableRow key={content.id}>
                    <TableCell>{content.id}</TableCell>
                    <TableCell>{content.title}</TableCell>
                    <TableCell>{content.section}</TableCell>
                    <TableCell>{content.contentType}</TableCell>
                    <TableCell>{content.status}</TableCell>
                    <TableCell>{content.date}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditContent(content)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => confirmDeleteContent(content.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handlePreviewContent(content)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={contents.length}
            page={page}
            sx={{color:"#fff"}}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>

      {/* Fenêtre de prévisualisation du contenu */}
      {previewContent && (
        <Dialog open={Boolean(previewContent)} onClose={() => setPreviewContent(null)}>
          <DialogTitle>Prévisualisation du contenu</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{previewContent.title}</Typography>
            <Typography variant="subtitle1">{previewContent.section}</Typography>
            <Typography variant="body1">{previewContent.content}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPreviewContent(null)} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Fenêtre de confirmation de suppression */}
      {deleteContentId && (
        <Dialog open={Boolean(deleteContentId)} onClose={() => setDeleteContentId(null)}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer ce contenu ? Cette action est irréversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteContentId(null)} color="primary">
              Annuler
            </Button>
            <Button onClick={deleteContent} color="error">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default CMSManagement;
