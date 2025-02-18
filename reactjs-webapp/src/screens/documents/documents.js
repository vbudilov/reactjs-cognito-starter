import React, { useState } from 'react';
import { MonochromeColors } from '../shared/constants/MonochromeTheme';
import { Grid, Card, CardContent, CardActions, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease-in-out',
    backgroundColor: MonochromeColors.WHITE,
    border: `1px solid ${MonochromeColors.MEDIUM_GRAY}`,
    borderRadius: '12px',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 24px ${MonochromeColors.MEDIUM_GRAY}`,
      borderColor: MonochromeColors.SECONDARY_BLUE
    }
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    '& .MuiTypography-root': {
      color: MonochromeColors.BLACK
    }
  },
  cardActions: {
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
    borderTop: `1px solid ${MonochromeColors.MEDIUM_GRAY}`,
    '& .MuiButton-root': {
      textTransform: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      backgroundColor: MonochromeColors.PRIMARY_BUTTON,
      color: MonochromeColors.WHITE,
      '&:hover': {
        backgroundColor: MonochromeColors.HOVER_BLUE
      },
      '&:active': {
        backgroundColor: MonochromeColors.ACTIVE_BLUE
      },
      '&.Mui-disabled': {
        backgroundColor: MonochromeColors.DISABLED_BUTTON
      }
    }
  },
  chatDialog: {
    minWidth: '400px',
    '& .MuiDialog-paper': {
      borderRadius: '16px',
      backgroundColor: MonochromeColors.WHITE,
      boxShadow: `0 8px 32px ${MonochromeColors.MEDIUM_GRAY}`
    }
  },
  dialogTitle: {
    borderBottom: `1px solid ${MonochromeColors.MEDIUM_GRAY}`,
    backgroundColor: MonochromeColors.WHITE,
    '& .MuiTypography-root': {
      color: MonochromeColors.BLACK,
      fontWeight: 600
    }
  },
  chatContent: {
    height: '500px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
    backgroundColor: MonochromeColors.LIGHT_GRAY
  },
  messageInput: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '24px',
      backgroundColor: MonochromeColors.WHITE,
      border: `1px solid ${MonochromeColors.MEDIUM_GRAY}`,
      '&:hover': {
        borderColor: MonochromeColors.SECONDARY_BLUE
      },
      '&.Mui-focused': {
        borderColor: MonochromeColors.PRIMARY_BLUE
      }
    }
  },
  message: {
    padding: '12px 16px',
    borderRadius: '18px',
    maxWidth: '70%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    fontSize: '14px',
    lineHeight: '1.4'
  },
  userMessage: {
    backgroundColor: '#2196f3',
    color: 'white',
    alignSelf: 'flex-end',
    borderBottomRightRadius: '4px'
  },
  botMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: '4px'
  },
  closeButton: {
    position: 'absolute',
    right: '8px',
    top: '8px'
  },
  dialogTitle: {
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    padding: '16px 24px'
  },
  dialogActions: {
    padding: '12px 16px',
    borderTop: '1px solid rgba(0,0,0,0.08)',
    backgroundColor: 'white'
  },
  sendButton: {
    borderRadius: '50%',
    padding: '12px',
    marginLeft: '8px',
    backgroundColor: '#2196f3',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1976d2'
    }
  },
  insightsDialog: {
    '& .MuiDialog-paper': {
      borderRadius: '16px',
      maxWidth: '600px'
    }
  },
  insightItem: {
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  }
}));
const mockDocuments = [
  {
    id: 1,
    title: 'Project Proposal',
    type: 'pdf',
    pages: 12,
    size: '2.4 MB',
    description: 'Annual project proposal for client review',
    insights: {
      keyTopics: ['Budget Analysis', 'Timeline Planning', 'Resource Allocation'],
      sentiment: 'Positive',
      readTime: '15 minutes',
      lastAccessed: '2 days ago',
      mostViewedSection: 'Financial Projections'
    }
  },
  {
    id: 2,
    title: 'Training Video',
    type: 'video',
    duration: '15:30',
    size: '45.8 MB',
    description: 'New employee onboarding video',
    insights: {
      keyTopics: ['Company Culture', 'HR Policies', 'Safety Guidelines'],
      engagement: '85%',
      averageViewDuration: '12 minutes',
      completionRate: '78%',
      mostRewatchedSegment: '5:30-7:45'
    }
  },
  {
    id: 3,
    title: 'Marketing Strategy',
    type: 'pdf',
    pages: 25,
    size: '3.8 MB',
    description: 'Q4 marketing strategy document',
    insights: {
      keyTopics: ['Social Media', 'Content Calendar', 'Budget Allocation'],
      sentiment: 'Neutral',
      readTime: '30 minutes',
      lastAccessed: '1 day ago',
      mostViewedSection: 'Campaign Timeline'
    }
  },
  {
    id: 4,
    title: 'Product Demo',
    type: 'video',
    duration: '10:15',
    size: '32.5 MB',
    description: 'New feature demonstration video',
    insights: {
      keyTopics: ['User Interface', 'Features Overview', 'Use Cases'],
      engagement: '92%',
      averageViewDuration: '9 minutes',
      completionRate: '85%',
      mostRewatchedSegment: '3:20-4:45'
    }
  },
  {
    id: 5,
    title: 'Financial Report',
    type: 'pdf',
    pages: 45,
    size: '5.2 MB',
    description: 'Annual financial performance report',
    insights: {
      keyTopics: ['Revenue Analysis', 'Cost Structure', 'Growth Projections'],
      sentiment: 'Positive',
      readTime: '50 minutes',
      lastAccessed: '3 days ago',
      mostViewedSection: 'Revenue Breakdown'
    }
  },
  {
    id: 6,
    title: 'Customer Testimonials',
    type: 'video',
    duration: '20:45',
    size: '58.3 MB',
    description: 'Collection of customer success stories',
    insights: {
      keyTopics: ['Success Stories', 'Client Feedback', 'Case Studies'],
      engagement: '78%',
      averageViewDuration: '15 minutes',
      completionRate: '65%',
      mostRewatchedSegment: '12:30-14:20'
    }
  },
  {
    id: 7,
    title: 'Technical Documentation',
    type: 'pdf',
    pages: 85,
    size: '7.8 MB',
    description: 'API documentation and technical specs',
    insights: {
      keyTopics: ['API Reference', 'Integration Guide', 'Security Protocols'],
      sentiment: 'Neutral',
      readTime: '90 minutes',
      lastAccessed: '5 hours ago',
      mostViewedSection: 'Authentication'
    }
  },
  {
    id: 8,
    title: 'Team Building Workshop',
    type: 'video',
    duration: '45:20',
    size: '125.4 MB',
    description: 'Recording of virtual team building session',
    insights: {
      keyTopics: ['Team Collaboration', 'Communication Skills', 'Group Activities'],
      engagement: '73%',
      averageViewDuration: '35 minutes',
      completionRate: '68%',
      mostRewatchedSegment: '22:15-25:30'
    }
  },
  {
    id: 9,
    title: 'Research Report',
    type: 'pdf',
    pages: 32,
    size: '4.1 MB',
    description: 'Market research findings and analysis',
    insights: {
      keyTopics: ['Market Trends', 'Competitor Analysis', 'Consumer Behavior'],
      sentiment: 'Neutral',
      readTime: '40 minutes',
      lastAccessed: '1 week ago',
      mostViewedSection: 'Key Findings'
    }
  },
  {
    id: 10,
    title: 'Sales Training',
    type: 'video',
    duration: '30:15',
    size: '82.6 MB',
    description: 'Sales techniques and best practices',
    insights: {
      keyTopics: ['Negotiation Skills', 'Closing Techniques', 'Customer Relations'],
      engagement: '88%',
      averageViewDuration: '25 minutes',
      completionRate: '82%',
      mostRewatchedSegment: '15:45-18:30'
    }
  },
  {
    id: 11,
    title: 'HR Guidelines',
    type: 'pdf',
    pages: 28,
    size: '3.5 MB',
    description: 'Updated company HR policies and procedures',
    insights: {
      keyTopics: ['Employee Benefits', 'Leave Policy', 'Code of Conduct'],
      sentiment: 'Neutral',
      readTime: '35 minutes',
      lastAccessed: '4 days ago',
      mostViewedSection: 'Benefits Overview'
    }
  },
  {
    id: 12,
    title: 'Product Roadmap',
    type: 'pdf',
    pages: 18,
    size: '2.8 MB',
    description: '2024 product development roadmap',
    insights: {
      keyTopics: ['Feature Pipeline', 'Release Schedule', 'Development Priorities'],
      sentiment: 'Positive',
      readTime: '25 minutes',
      lastAccessed: '12 hours ago',
      mostViewedSection: 'Q1 Releases'
    }
  }
];

export function Documents() {
  const classes = useStyles();
  const [openChat, setOpenChat] = useState(false);
  const [openInsights, setOpenInsights] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleChatOpen = (document) => {
    setSelectedDocument(document);
    setOpenChat(true);
  };

  const handleChatClose = () => {
    setOpenChat(false);
    setSelectedDocument(null);
    setChatHistory([]);
  };

  const handleInsightsOpen = (document) => {
    setSelectedDocument(document);
    setOpenInsights(true);
  };

  const handleInsightsClose = () => {
    setOpenInsights(false);
    setSelectedDocument(null);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory,
        { text: message, sender: 'user' },
        { text: `This is a response about ${selectedDocument.title}`, sender: 'bot' }
      ]);
      setMessage('');
    }
  };

  const renderInsightsContent = (document) => {
    if (document.type === 'pdf') {
      return (
        <>
          <div className={classes.insightItem}>
            <Typography variant="subtitle1" gutterBottom>Key Topics</Typography>
            <Typography variant="body2">{document.insights.keyTopics.join(', ')}</Typography>
          </div>
          <div className={classes.insightItem}>
            <Typography variant="subtitle1" gutterBottom>Document Analysis</Typography>
            <Typography variant="body2">Sentiment: {document.insights.sentiment}</Typography>
            <Typography variant="body2">Estimated Read Time: {document.insights.readTime}</Typography>
            <Typography variant="body2">Last Accessed: {document.insights.lastAccessed}</Typography>
            <Typography variant="body2">Most Viewed Section: {document.insights.mostViewedSection}</Typography>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={classes.insightItem}>
            <Typography variant="subtitle1" gutterBottom>Key Topics</Typography>
            <Typography variant="body2">{document.insights.keyTopics.join(', ')}</Typography>
          </div>
          <div className={classes.insightItem}>
            <Typography variant="subtitle1" gutterBottom>Engagement Metrics</Typography>
            <Typography variant="body2">Engagement Rate: {document.insights.engagement}</Typography>
            <Typography variant="body2">Average View Duration: {document.insights.averageViewDuration}</Typography>
            <Typography variant="body2">Completion Rate: {document.insights.completionRate}</Typography>
            <Typography variant="body2">Most Rewatched Segment: {document.insights.mostRewatchedSegment}</Typography>
          </div>
        </>
      );
    }
  };

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
                <Button size="small" color="primary" onClick={() => handleChatOpen(document)}>
                  Chat
                </Button>
                <Button size="small" color="primary" onClick={() => handleInsightsOpen(document)}>
                  Insights
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openChat}
        onClose={handleChatClose}
        maxWidth="sm"
        fullWidth
        className={classes.chatDialog}
      >
        <DialogTitle className={classes.dialogTitle}>
          Chat about {selectedDocument?.title}
          <IconButton
            className={classes.closeButton}
            onClick={handleChatClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className={classes.chatContent}>
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`${classes.message} ${msg.sender === 'user' ? classes.userMessage : classes.botMessage}`}
            >
              {msg.text}
            </div>
          ))}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <TextField
            className={classes.messageInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            variant="outlined"
            size="small"
          />
          <IconButton className={classes.sendButton} onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openInsights}
        onClose={handleInsightsClose}
        className={classes.insightsDialog}
      >
        <DialogTitle className={classes.dialogTitle}>
          Insights for {selectedDocument?.title}
          <IconButton
            className={classes.closeButton}
            onClick={handleInsightsClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedDocument && renderInsightsContent(selectedDocument)}
        </DialogContent>
      </Dialog>
    </div>
  );
}
