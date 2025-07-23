// Main application controller
class ComputationalThinkingApp {
    constructor() {
        this.currentGrade = null;
        this.currentTopic = null;
        this.currentModule = null;
        this.currentQuestionIndex = 0;
        this.currentQuestions = [];
        this.moduleAnswers = {};
        
        this.init();
    }

    init() {
        // Initialize storage
        if (!Storage.get('initialized')) {
            Storage.init();
        }
        
        // Load initial progress
        this.updateProgressDisplay();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Show home section by default
        this.showHome();
    }

    setupEventListeners() {
        // Navigation event listeners are handled by global functions
        // Module-specific events will be set up in each module
    }

    showHome() {
        this.hideAllSections();
        document.getElementById('home-section').classList.add('active');
        this.setActiveNav('home');
    }

    showGradeSelection() {
        this.hideAllSections();
        document.getElementById('grade-section').classList.add('active');
        this.setActiveNav('materi');
        this.updateProgressDisplay();
    }

    showProgress() {
        this.hideAllSections();
        document.getElementById('progress-section').classList.add('active');
        this.setActiveNav('progress');
        Progress.updateProgressSection();
    }

    selectGrade(grade) {
        this.currentGrade = grade;
        this.showTopicSelection();
    }

    showTopicSelection() {
        this.hideAllSections();
        document.getElementById('topic-section').classList.add('active');
        
        // Update current grade display
        document.getElementById('current-grade').textContent = `Kelas ${this.currentGrade}`;
        
        // Load topics for the selected grade
        this.loadTopics();
    }

    loadTopics() {
        const topicGrid = document.getElementById('topic-grid');
        const gradeContent = ContentData.grades[this.currentGrade];
        
        topicGrid.innerHTML = '';
        
        Object.keys(gradeContent).forEach(topic => {
            const topicData = gradeContent[topic];
            const progress = Progress.getTopicProgress(this.currentGrade, topic);
            
            const topicCard = document.createElement('div');
            topicCard.className = 'bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow';
            topicCard.onclick = () => this.selectTopic(topic);
            
            topicCard.innerHTML = `
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 ${topicData.color} rounded-full flex items-center justify-center mr-4">
                        <i data-feather="${topicData.icon}" class="w-6 h-6 text-white"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-800">${topicData.title}</h3>
                        <p class="text-sm text-gray-600">${topicData.description}</p>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                        ${topicData.questions.length} Pertanyaan
                    </div>
                    <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                        ${Math.round(progress)}% Selesai
                    </div>
                </div>
            `;
            
            topicGrid.appendChild(topicCard);
        });
        
        // Re-initialize Feather icons
        feather.replace();
    }

    selectTopic(topic) {
        this.currentTopic = topic;
        this.currentQuestionIndex = 0;
        this.moduleAnswers = {};
        
        // Load questions for the topic
        const gradeContent = ContentData.grades[this.currentGrade];
        this.currentQuestions = [...gradeContent[topic].questions];
        
        this.showModule();
    }

    showModule() {
        this.hideAllSections();
        document.getElementById('module-section').classList.add('active');
        
        // Update module title
        const gradeContent = ContentData.grades[this.currentGrade];
        const topicData = gradeContent[this.currentTopic];
        document.getElementById('module-title').textContent = topicData.title;
        
        // Load the current question
        this.loadQuestion();
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }

    loadQuestion() {
        if (this.currentQuestionIndex >= this.currentQuestions.length) {
            this.showTopicCompletion();
            return;
        }

        const question = this.currentQuestions[this.currentQuestionIndex];
        const moduleContent = document.getElementById('module-content');
        
        // Update hint
        document.getElementById('hint-content').textContent = question.hint || 'Tidak ada petunjuk untuk pertanyaan ini.';
        
        // Load question based on type
        switch (question.type) {
            case 'decomposition':
                Decomposition.loadQuestion(question, moduleContent);
                break;
            case 'pattern':
                Pattern.loadQuestion(question, moduleContent);
                break;
            case 'abstraction':
                Abstraction.loadQuestion(question, moduleContent);
                break;
            case 'algorithm':
                Algorithm.loadQuestion(question, moduleContent);
                break;
            default:
                this.loadMultipleChoice(question, moduleContent);
        }
    }

    loadMultipleChoice(question, container) {
        // Shuffle options if this is a navigation (to prevent memorization)
        if (question.options && !this.moduleAnswers[this.currentQuestionIndex]) {
            question.options = Shuffle.array([...question.options]);
        }
        
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                ${question.context ? `<p class="text-gray-600 mb-6">${question.context}</p>` : ''}
                <div class="space-y-3">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option border border-gray-200 rounded-lg p-4" onclick="app.selectOption(${index})">
                            <label class="cursor-pointer">
                                <input type="radio" name="answer" value="${index}" class="mr-3">
                                ${option.text}
                            </label>
                        </div>
                    `).join('')}
                </div>
                ${this.moduleAnswers[this.currentQuestionIndex] !== undefined ? this.getAnswerFeedback(question) : ''}
            </div>
        `;
    }

    selectOption(optionIndex) {
        // Store the answer
        this.moduleAnswers[this.currentQuestionIndex] = optionIndex;
        
        // Update visual feedback
        const options = document.querySelectorAll('.quiz-option');
        const question = this.currentQuestions[this.currentQuestionIndex];
        
        options.forEach((option, index) => {
            const radio = option.querySelector('input[type="radio"]');
            const isCorrect = question.options[index].correct;
            const isSelected = index === optionIndex;
            
            if (isSelected) {
                radio.checked = true;
                option.classList.add('selected');
            }
            
            if (isCorrect) {
                option.classList.add('correct');
            } else if (isSelected && !isCorrect) {
                option.classList.add('incorrect');
            }
            
            // Disable further selection
            option.style.pointerEvents = 'none';
        });
        
        // Show feedback
        const feedbackDiv = document.createElement('div');
        feedbackDiv.innerHTML = this.getAnswerFeedback(question);
        document.getElementById('module-content').appendChild(feedbackDiv);
        
        // Save progress
        Progress.updateQuestionProgress(this.currentGrade, this.currentTopic, this.currentQuestionIndex, 
            question.options[optionIndex].correct);
    }

    getAnswerFeedback(question) {
        const selectedAnswer = this.moduleAnswers[this.currentQuestionIndex];
        const isCorrect = question.options[selectedAnswer].correct;
        
        return `
            <div class="mt-6 p-4 rounded-lg ${isCorrect ? 'success-message border' : 'error-message border'}">
                <div class="flex items-center">
                    <i data-feather="${isCorrect ? 'check-circle' : 'x-circle'}" class="w-5 h-5 mr-2"></i>
                    <strong>${isCorrect ? 'Benar!' : 'Kurang Tepat'}</strong>
                </div>
                <p class="mt-2">${question.explanation}</p>
            </div>
        `;
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.loadQuestion();
        this.updateNavigationButtons();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.loadQuestion();
            this.updateNavigationButtons();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        // Update previous button
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Update next button text
        if (this.currentQuestionIndex >= this.currentQuestions.length - 1) {
            nextBtn.innerHTML = 'Selesai<i data-feather="check" class="w-4 h-4 inline ml-2"></i>';
        } else {
            nextBtn.innerHTML = 'Selanjutnya<i data-feather="chevron-right" class="w-4 h-4 inline ml-2"></i>';
        }
        
        // Re-initialize Feather icons
        feather.replace();
    }

    showTopicCompletion() {
        const moduleContent = document.getElementById('module-content');
        const gradeContent = ContentData.grades[this.currentGrade];
        const topicData = gradeContent[this.currentTopic];
        
        // Calculate score
        const correctAnswers = Object.keys(this.moduleAnswers).filter(index => {
            const question = this.currentQuestions[index];
            const answer = this.moduleAnswers[index];
            return question.options && question.options[answer] && question.options[answer].correct;
        }).length;
        
        const totalQuestions = this.currentQuestions.length;
        const score = Math.round((correctAnswers / totalQuestions) * 100);
        
        // Award badge if score is high enough
        if (score >= 80) {
            Progress.awardBadge(this.currentGrade, this.currentTopic);
        }
        
        moduleContent.innerHTML = `
            <div class="text-center fade-in">
                <div class="w-24 h-24 mx-auto mb-6">
                    ${score >= 80 ? 
                        '<div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"><i data-feather="award" class="w-12 h-12 text-green-600"></i></div>' :
                        '<div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center"><i data-feather="check-circle" class="w-12 h-12 text-blue-600"></i></div>'
                    }
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Topik Selesai!</h3>
                <p class="text-gray-600 mb-6">Anda telah menyelesaikan topik "${topicData.title}"</p>
                <div class="bg-gray-50 rounded-lg p-6 mb-6">
                    <div class="text-3xl font-bold text-gray-800 mb-2">${score}%</div>
                    <div class="text-gray-600">Skor Anda: ${correctAnswers}/${totalQuestions} benar</div>
                    ${score >= 80 ? '<div class="text-green-600 font-medium mt-2">🏆 Lencana diperoleh!</div>' : ''}
                </div>
                <div class="space-x-4">
                    <button onclick="app.showTopicSelection()" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                        Kembali ke Topik
                    </button>
                    <button onclick="app.retryTopic()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Ulangi Topik
                    </button>
                </div>
            </div>
        `;
        
        // Hide navigation buttons
        document.getElementById('prev-btn').style.display = 'none';
        document.getElementById('next-btn').style.display = 'none';
        
        // Re-initialize Feather icons
        feather.replace();
    }

    retryTopic() {
        this.currentQuestionIndex = 0;
        this.moduleAnswers = {};
        
        // Reset navigation buttons
        document.getElementById('prev-btn').style.display = 'inline-flex';
        document.getElementById('next-btn').style.display = 'inline-flex';
        
        this.loadQuestion();
        this.updateNavigationButtons();
    }

    backToTopics() {
        this.showTopicSelection();
    }

    toggleHint() {
        const hintPanel = document.getElementById('hint-panel');
        hintPanel.classList.toggle('hidden');
    }

    updateProgressDisplay() {
        // Update grade selection progress
        ['X', 'XI', 'XII'].forEach(grade => {
            const progress = Progress.getGradeProgress(grade);
            const element = document.getElementById(`grade-${grade.toLowerCase()}-progress`);
            if (element) {
                element.textContent = `${Math.round(progress)}% Selesai`;
            }
        });
    }

    hideAllSections() {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
    }

    setActiveNav(section) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const navMap = {
            'home': 0,
            'materi': 1,
            'progress': 2
        };
        
        const navButtons = document.querySelectorAll('.nav-btn');
        if (navButtons[navMap[section]]) {
            navButtons[navMap[section]].classList.add('active');
        }
    }
}

// Global functions for navigation (called from HTML)
function showHome() {
    app.showHome();
}

function showGradeSelection() {
    app.showGradeSelection();
}

function showProgress() {
    app.showProgress();
}

function selectGrade(grade) {
    app.selectGrade(grade);
}

function nextQuestion() {
    app.nextQuestion();
}

function previousQuestion() {
    app.previousQuestion();
}

function backToTopics() {
    app.backToTopics();
}

function toggleHint() {
    app.toggleHint();
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ComputationalThinkingApp();
});
