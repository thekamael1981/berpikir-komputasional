// Pattern Recognition module for identifying patterns and sequences
class Pattern {
    static loadQuestion(question, container) {
        switch (question.subtype) {
            case 'sequence':
                this.loadSequencePattern(question, container);
                break;
            case 'visual':
                this.loadVisualPattern(question, container);
                break;
            case 'number-pattern':
                this.loadNumberPattern(question, container);
                break;
            default:
                app.loadMultipleChoice(question, container);
        }
    }

    static loadSequencePattern(question, container) {
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <p class="text-gray-600 mb-6">${question.context || ''}</p>
                
                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Urutan Pola:</h4>
                    <div class="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-lg">
                        ${question.sequence.map((item, index) => `
                            <div class="sequence-item ${index === question.missingIndex ? 'missing' : ''} bg-white border-2 border-gray-300 rounded-lg p-3 text-center min-w-16">
                                ${index === question.missingIndex ? '?' : item}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Pilih jawaban yang tepat:</h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        ${question.options.map((option, index) => `
                            <button onclick="Pattern.selectSequenceAnswer(${index})" 
                                    class="pattern-option bg-white border-2 border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                                ${option.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div id="sequence-feedback" class="mt-4"></div>
            </div>
        `;
    }

    static selectSequenceAnswer(optionIndex) {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const isCorrect = question.options[optionIndex].correct;
        
        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = optionIndex;

        // Update visual feedback
        const options = document.querySelectorAll('.pattern-option');
        options.forEach((option, index) => {
            if (index === optionIndex) {
                option.classList.add(isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50');
            }
            if (question.options[index].correct) {
                option.classList.add('border-green-500 bg-green-50');
            }
            option.disabled = true;
            option.style.pointerEvents = 'none';
        });

        // Update the missing item in sequence
        const missingItem = document.querySelector('.sequence-item.missing');
        if (missingItem) {
            missingItem.textContent = question.options[optionIndex].text;
            missingItem.classList.add(isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50');
        }

        // Show feedback
        const feedbackDiv = document.getElementById('sequence-feedback');
        feedbackDiv.innerHTML = `
            <div class="p-4 rounded-lg ${isCorrect ? 'success-message border' : 'error-message border'}">
                <div class="flex items-center">
                    <i data-feather="${isCorrect ? 'check-circle' : 'x-circle'}" class="w-5 h-5 mr-2"></i>
                    <strong>${isCorrect ? 'Benar!' : 'Kurang Tepat'}</strong>
                </div>
                <p class="mt-2">${question.explanation}</p>
            </div>
        `;

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }

    static loadVisualPattern(question, container) {
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <p class="text-gray-600 mb-6">${question.context || ''}</p>
                
                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Klik pada sel-sel untuk membuat pola:</h4>
                    <div class="pattern-grid ${question.gridSize}" id="pattern-grid">
                        ${Array.from({length: question.gridSize === 'grid-3x3' ? 9 : 16}, (_, index) => `
                            <div class="pattern-cell" onclick="Pattern.toggleCell(${index})" data-index="${index}">
                                ${question.pattern && question.pattern.includes(index) ? '●' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Pola Target:</h4>
                    <div class="text-sm text-gray-600 mb-3">${question.patternDescription}</div>
                    <div class="pattern-grid ${question.gridSize}">
                        ${Array.from({length: question.gridSize === 'grid-3x3' ? 9 : 16}, (_, index) => `
                            <div class="pattern-cell ${question.targetPattern.includes(index) ? 'active' : ''}">
                                ${question.targetPattern.includes(index) ? '●' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <button onclick="Pattern.checkVisualPattern()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-4">
                        Periksa Pola
                    </button>
                    <button onclick="Pattern.clearPattern()" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                        Hapus Semua
                    </button>
                </div>
                
                <div id="visual-feedback" class="mt-4"></div>
            </div>
        `;

        // Initialize user pattern
        this.userPattern = [];
    }

    static toggleCell(index) {
        const cell = document.querySelector(`[data-index="${index}"]`);
        if (this.userPattern.includes(index)) {
            this.userPattern = this.userPattern.filter(i => i !== index);
            cell.classList.remove('active');
            cell.textContent = '';
        } else {
            this.userPattern.push(index);
            cell.classList.add('active');
            cell.textContent = '●';
        }
    }

    static clearPattern() {
        this.userPattern = [];
        document.querySelectorAll('#pattern-grid .pattern-cell').forEach(cell => {
            cell.classList.remove('active');
            cell.textContent = '';
        });
        document.getElementById('visual-feedback').innerHTML = '';
    }

    static checkVisualPattern() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        
        // Sort both arrays for comparison
        const userSorted = [...this.userPattern].sort((a, b) => a - b);
        const targetSorted = [...question.targetPattern].sort((a, b) => a - b);
        
        const isCorrect = userSorted.length === targetSorted.length &&
            userSorted.every((index, i) => index === targetSorted[i]);

        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = this.userPattern;

        // Update cell colors
        document.querySelectorAll('#pattern-grid .pattern-cell').forEach((cell, index) => {
            const isUserSelected = this.userPattern.includes(index);
            const isTarget = question.targetPattern.includes(index);
            
            if (isUserSelected && isTarget) {
                cell.classList.add('correct');
            } else if (isUserSelected && !isTarget) {
                cell.classList.add('incorrect');
            }
            
            // Disable further interaction
            cell.style.pointerEvents = 'none';
        });

        // Show feedback
        const feedbackDiv = document.getElementById('visual-feedback');
        feedbackDiv.innerHTML = `
            <div class="p-4 rounded-lg ${isCorrect ? 'success-message border' : 'error-message border'}">
                <div class="flex items-center">
                    <i data-feather="${isCorrect ? 'check-circle' : 'x-circle'}" class="w-5 h-5 mr-2"></i>
                    <strong>${isCorrect ? 'Benar!' : 'Kurang Tepat'}</strong>
                </div>
                <p class="mt-2">${question.explanation}</p>
            </div>
        `;

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }

    static loadNumberPattern(question, container) {
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <p class="text-gray-600 mb-6">${question.context || ''}</p>
                
                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Deret Angka:</h4>
                    <div class="flex flex-wrap items-center gap-3 bg-gray-50 p-4 rounded-lg">
                        ${question.numbers.map((num, index) => `
                            <div class="number-item bg-white border-2 border-gray-300 rounded-lg p-3 text-center min-w-16 font-mono text-lg">
                                ${num === null ? '?' : num}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Apa angka yang hilang?</h4>
                    <div class="flex items-center space-x-4">
                        <input type="number" id="number-input" class="border border-gray-300 rounded-lg px-4 py-2 text-center font-mono text-lg" placeholder="Masukkan angka">
                        <button onclick="Pattern.checkNumberPattern()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Periksa
                        </button>
                    </div>
                </div>
                
                <div id="number-feedback" class="mt-4"></div>
            </div>
        `;
    }

    static checkNumberPattern() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const userAnswer = parseInt(document.getElementById('number-input').value);
        const isCorrect = userAnswer === question.correctAnswer;

        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = userAnswer;

        // Update the missing number
        const missingItem = document.querySelector('.number-item:has-text("?")');
        if (missingItem) {
            missingItem.textContent = userAnswer;
            missingItem.classList.add(isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50');
        }

        // Show feedback
        const feedbackDiv = document.getElementById('number-feedback');
        feedbackDiv.innerHTML = `
            <div class="p-4 rounded-lg ${isCorrect ? 'success-message border' : 'error-message border'}">
                <div class="flex items-center">
                    <i data-feather="${isCorrect ? 'check-circle' : 'x-circle'}" class="w-5 h-5 mr-2"></i>
                    <strong>${isCorrect ? 'Benar!' : 'Kurang Tepat'}</strong>
                </div>
                <p class="mt-2">${question.explanation}</p>
                ${!isCorrect ? `<p class="mt-2"><strong>Jawaban yang benar:</strong> ${question.correctAnswer}</p>` : ''}
            </div>
        `;

        // Disable input
        document.getElementById('number-input').disabled = true;

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }
}
