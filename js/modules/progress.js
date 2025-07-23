// Progress tracking and badge management
class Progress {
    static updateQuestionProgress(grade, topic, questionIndex, isCorrect) {
        const progressKey = `progress_${grade}_${topic}`;
        let progress = Storage.get(progressKey) || {};
        
        progress[questionIndex] = {
            correct: isCorrect,
            timestamp: Date.now()
        };
        
        Storage.set(progressKey, progress);
        
        // Update overall grade progress
        this.updateGradeProgress(grade);
    }

    static getQuestionProgress(grade, topic, questionIndex) {
        const progressKey = `progress_${grade}_${topic}`;
        const progress = Storage.get(progressKey) || {};
        return progress[questionIndex] || null;
    }

    static getTopicProgress(grade, topic) {
        const progressKey = `progress_${grade}_${topic}`;
        const progress = Storage.get(progressKey) || {};
        const gradeContent = ContentData.grades[grade];
        
        if (!gradeContent || !gradeContent[topic]) return 0;
        
        const totalQuestions = gradeContent[topic].questions.length;
        const completedQuestions = Object.keys(progress).length;
        
        return totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
    }

    static getGradeProgress(grade) {
        const gradeContent = ContentData.grades[grade];
        if (!gradeContent) return 0;
        
        const topics = Object.keys(gradeContent);
        const topicProgresses = topics.map(topic => this.getTopicProgress(grade, topic));
        
        return topics.length > 0 ? 
            topicProgresses.reduce((sum, progress) => sum + progress, 0) / topics.length : 0;
    }

    static updateGradeProgress(grade) {
        const progress = this.getGradeProgress(grade);
        const element = document.getElementById(`grade-${grade.toLowerCase()}-progress`);
        if (element) {
            element.textContent = `${Math.round(progress)}% Selesai`;
        }
    }

    static awardBadge(grade, topic) {
        const badgeKey = `badge_${grade}_${topic}`;
        const badge = {
            grade: grade,
            topic: topic,
            earnedAt: Date.now()
        };
        
        Storage.set(badgeKey, badge);
        
        // Update badge display if on progress page
        this.updateBadgeDisplay();
    }

    static getBadges() {
        const badges = [];
        const storage = Storage.getAll();
        
        Object.keys(storage).forEach(key => {
            if (key.startsWith('badge_')) {
                badges.push(storage[key]);
            }
        });
        
        return badges.sort((a, b) => b.earnedAt - a.earnedAt);
    }

    static updateProgressSection() {
        // Update overall progress bars
        ['X', 'XI', 'XII'].forEach(grade => {
            const progress = this.getGradeProgress(grade);
            const progressSpan = document.getElementById(`overall-${grade.toLowerCase()}-progress`);
            const progressBar = document.getElementById(`overall-${grade.toLowerCase()}-bar`);
            
            if (progressSpan && progressBar) {
                progressSpan.textContent = `${Math.round(progress)}%`;
                progressBar.style.width = `${progress}%`;
            }
        });
        
        // Update badges
        this.updateBadgeDisplay();
    }

    static updateBadgeDisplay() {
        const badgesContainer = document.getElementById('badges-container');
        if (!badgesContainer) return;
        
        const earnedBadges = this.getBadges();
        const allPossibleBadges = this.getAllPossibleBadges();
        
        badgesContainer.innerHTML = '';
        
        allPossibleBadges.forEach(possibleBadge => {
            const earnedBadge = earnedBadges.find(badge => 
                badge.grade === possibleBadge.grade && badge.topic === possibleBadge.topic
            );
            
            const isEarned = !!earnedBadge;
            const badgeDiv = document.createElement('div');
            badgeDiv.className = `badge bg-white rounded-lg shadow-md p-4 text-center ${isEarned ? 'earned' : 'locked'}`;
            
            badgeDiv.innerHTML = `
                <div class="w-16 h-16 mx-auto mb-3 ${possibleBadge.color} rounded-full flex items-center justify-center">
                    <i data-feather="${possibleBadge.icon}" class="w-8 h-8 text-white"></i>
                </div>
                <h4 class="font-medium text-gray-800 text-sm mb-1">${possibleBadge.title}</h4>
                <p class="text-xs text-gray-600">Kelas ${possibleBadge.grade}</p>
                ${isEarned ? 
                    `<p class="text-xs text-green-600 mt-2">Diperoleh ${new Date(earnedBadge.earnedAt).toLocaleDateString('id-ID')}</p>` :
                    '<p class="text-xs text-gray-400 mt-2">Belum diperoleh</p>'
                }
            `;
            
            badgesContainer.appendChild(badgeDiv);
        });
        
        // Re-initialize Feather icons
        feather.replace();
    }

    static getAllPossibleBadges() {
        const badges = [];
        
        Object.keys(ContentData.grades).forEach(grade => {
            Object.keys(ContentData.grades[grade]).forEach(topic => {
                const topicData = ContentData.grades[grade][topic];
                badges.push({
                    grade: grade,
                    topic: topic,
                    title: topicData.title,
                    icon: topicData.icon,
                    color: topicData.color
                });
            });
        });
        
        return badges;
    }

    static getStatistics() {
        const stats = {
            totalQuestionsAnswered: 0,
            totalCorrectAnswers: 0,
            badgesEarned: this.getBadges().length,
            timeSpent: 0 // Could be implemented with session tracking
        };
        
        const storage = Storage.getAll();
        
        Object.keys(storage).forEach(key => {
            if (key.startsWith('progress_')) {
                const progress = storage[key];
                Object.values(progress).forEach(answer => {
                    stats.totalQuestionsAnswered++;
                    if (answer.correct) {
                        stats.totalCorrectAnswers++;
                    }
                });
            }
        });
        
        return stats;
    }

    static exportProgress() {
        const data = {
            progress: Storage.getAll(),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `computational-thinking-progress-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }

    static importProgress(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.progress && typeof data.progress === 'object') {
                // Merge with existing progress
                Object.keys(data.progress).forEach(key => {
                    Storage.set(key, data.progress[key]);
                });
                
                // Update displays
                this.updateProgressSection();
                app.updateProgressDisplay();
                
                return true;
            }
        } catch (error) {
            console.error('Failed to import progress:', error);
        }
        
        return false;
    }

    static clearAllProgress() {
        if (confirm('Apakah Anda yakin ingin menghapus semua progress? Tindakan ini tidak dapat dibatalkan.')) {
            const storage = Storage.getAll();
            
            Object.keys(storage).forEach(key => {
                if (key.startsWith('progress_') || key.startsWith('badge_')) {
                    Storage.remove(key);
                }
            });
            
            // Update displays
            this.updateProgressSection();
            app.updateProgressDisplay();
            
            alert('Semua progress telah dihapus.');
        }
    }
}
