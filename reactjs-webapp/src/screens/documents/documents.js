import React from 'react';
import { Grid, Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardContent: {
    flexGrow: 1
  },
  cardActions: {
    justifyContent: 'flex-end'
  }
}));

const mockDocuments = [
  {
    id: 1,
    title: 'Project Proposal',
    type: 'pdf',
    pages: 12,
    size: '2.4 MB',
    description: 'Annual project proposal for client review'
  },
  {
    id: 2,
    title: 'Training Video',
    type: 'video',
    duration: '15:30',
    size: '45.8 MB',
    description: 'New employee onboarding video'
  },
  {
    id: 3,
    title: 'Technical Documentation',
    type: 'pdf',
    pages: 45,
    size: '5.2 MB',
    description: 'System architecture documentation'
  },
  {
    id: 4,
    title: 'Product Demo',
    type: 'video',
    duration: '08:45',
    size: '28.6 MB',
    description: 'Latest feature demonstration'
  },
  {
    id: 5,
    title: 'Contract Agreement',
    type: 'pdf',
    pages: 8,
    size: '1.8 MB',
    description: 'Legal contract template'
  },
  {
    id: 6,
    title: 'Tutorial Video',
    type: 'video',
    duration: '12:20',
    size: '35.2 MB',
    description: 'Step-by-step guide for new features'
  },
  {
    id: 7,
    title: 'Annual Report',
    type: 'pdf',
    pages: 28,
    size: '4.1 MB',
    description: 'Financial year summary report'
  }
];

export function Documents() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {mockDocuments.map((document) => (
          <Grid item xs={12} sm={6} md={4} key={document.id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {document.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {document.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Type: {document.type}
                </Typography>
                {document.type === 'pdf' ? (
                  <Typography variant="body2" color="textSecondary" component="p">
                    Pages: {document.pages}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="textSecondary" component="p">
                    Duration: {document.duration}
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary" component="p">
                  Size: {document.size}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">
                  Chat
                </Button>
                <Button size="small" color="primary">
                  Insights
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}