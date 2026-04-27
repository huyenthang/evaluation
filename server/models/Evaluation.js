const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  intern: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  evaluationType: { type: String, enum: ['preliminary', 'detailed'], required: true },
  period: { type: String, required: true },
  status: { type: String, enum: ['draft', 'completed'], default: 'draft' },
  
  preliminaryScores: {
    professionalAttitude: { type: Number, min: 1, max: 5 },
    workPerformance: { type: Number, min: 1, max: 5 },
    professionalKnowledge: { type: Number, min: 1, max: 5 },
    vocationalSkills: { type: Number, min: 1, max: 5 },
    communicationTeamwork: { type: Number, min: 1, max: 5 },
    foreignLanguage: { type: Number, min: 1, max: 5 }
  },
  
  detailedScores: {
    professional: {
      followInstructions: { type: Number, min: 1, max: 5 },
      completeTasks: { type: Number, min: 1, max: 5 },
      problemSolving: { type: Number, min: 1, max: 5 },
      directCommunication: { type: Number, min: 1, max: 5 }
    },
    knowledge: {
      hotelServiceUnderstanding: { type: Number, min: 1, max: 5 },
      knowledgeDevelopment: { type: Number, min: 1, max: 5 },
      practicalApplication: { type: Number, min: 1, max: 5 },
      independentThinking: { type: Number, min: 1, max: 5 }
    },
    attitude: {
      politeness: { type: Number, min: 1, max: 5 },
      appearance: { type: Number, min: 1, max: 5 },
      punctuality: { type: Number, min: 1, max: 5 },
      timeliness: { type: Number, min: 1, max: 5 },
      enthusiasm: { type: Number, min: 1, max: 5 },
      ruleCompliance: { type: Number, min: 1, max: 5 }
    }
  },
  
  improvement: { type: String, required: true },
  otherComments: { type: String },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

evaluationSchema.virtual('averageScore').get(function() {
  if (this.evaluationType === 'preliminary' && this.preliminaryScores) {
    const scores = Object.values(this.preliminaryScores).filter(s => s !== undefined);
    return scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 0;
  }
  if (this.evaluationType === 'detailed' && this.detailedScores) {
    const allScores = [
      ...Object.values(this.detailedScores.professional || {}),
      ...Object.values(this.detailedScores.knowledge || {}),
      ...Object.values(this.detailedScores.attitude || {})
    ].filter(s => s !== undefined);
    return allScores.length > 0 ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(2) : 0;
  }
  return 0;
});

evaluationSchema.set('toJSON', { virtuals: true });
evaluationSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);