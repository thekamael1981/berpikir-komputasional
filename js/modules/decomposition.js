// Decomposition module for breaking down complex problems
class Decomposition {
    static loadQuestion(question, container) {
        switch (question.subtype) {
            case 'problem-breakdown':
                this.loadProblemBreakdown(question, container);
                break;
            case 'step-ordering':
                this.loadStepOrdering(question, container);
                break;
            default:
                app.loadMultipleChoice(question, container);
        }
    }

    static loadProblemBreakdown(question, container) {
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <p class="text-gray-600 mb-6">${question.context}</p>
                
                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Masalah Utama:</h4>
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        ${question.mainProblem}
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Pecah masalah di atas menjadi bagian-bagian kecil:</h4>
                    <div class="space-y-3" id="breakdown-options">
                        ${question.options.map((option, index) => `
                            <div class="breakdown-option border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50" onclick="Decomposition.selectBreakdownOption(${index})">
                                <div class="flex items-center">
                                    <input type="checkbox" class="mr-3" id="breakdown-${index}">
                                    <label for="breakdown-${index}" class="cursor-pointer flex-1">${option.text}</label>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <button onclick="Decomposition.checkBreakdownAnswer()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Periksa Jawaban
                </button>
                
                <div id="breakdown-feedback" class="mt-4"></div>
            </div>
        `;
    }

    static selectBreakdownOption(index) {
        const checkbox = document.getElementById(`breakdown-${index}`);
        checkbox.checked = !checkbox.checked;
    }

    static checkBreakdownAnswer() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const selectedOptions = [];
        
        question.options.forEach((option, index) => {
            const checkbox = document.getElementById(`breakdown-${index}`);
            if (checkbox.checked) {
                selectedOptions.push(index);
            }
        });

        // Check if all correct options are selected and no incorrect ones
        const correctOptions = question.options
            .map((option, index) => option.correct ? index : null)
            .filter(index => index !== null);
        
        const isCorrect = selectedOptions.length === correctOptions.length &&
            selectedOptions.every(index => correctOptions.includes(index));

        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = selectedOptions;

        // Show feedback
        const feedbackDiv = document.getElementById('breakdown-feedback');
        feedbackDiv.innerHTML = `
            <div class="p-4 rounded-lg ${isCorrect ? 'success-message border' : 'error-message border'}">
                <div class="flex items-center">
                    <i data-feather="${isCorrect ? 'check-circle' : 'x-circle'}" class="w-5 h-5 mr-2"></i>
                    <strong>${isCorrect ? 'Benar!' : 'Kurang Tepat'}</strong>
                </div>
                <p class="mt-2">${question.explanation}</p>
                ${!isCorrect ? `
                    <div class="mt-3">
                        <strong>Jawaban yang benar:</strong>
                        <ul class="list-disc list-inside mt-2">
                            ${correctOptions.map(index => `<li>${question.options[index].text}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;

        // Disable further selection
        document.querySelectorAll('.breakdown-option').forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }

    static loadStepOrdering(question, container) {
        // Shuffle the steps for display
        const shuffledSteps = Shuffle.array([...question.steps]);
        
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <p class="text-gray-600 mb-6">${question.context}</p>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-medium text-gray-800 mb-3">Langkah-langkah (Seret untuk mengurutkan):</h4>
                        <div id="step-source" class="space-y-3 min-h-48">
                            ${shuffledSteps.map((step, index) => `
                                <div class="step-item draggable bg-gray-100 border border-gray-300 rounded-lg p-3 cursor-move" 
                                     draggable="true" 
                                     data-step="${step.id}"
                                     ondragstart="Decomposition.dragStart(event)"
                                     ondragend="Decomposition.dragEnd(event)">
                                    ${step.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-medium text-gray-800 mb-3">Urutan yang Benar:</h4>
                        <div id="step-target" class="drag-area"
                             ondragover="Decomposition.dragOver(event)"
                             ondrop="Decomposition.drop(event)">
                            <p class="text-gray-500 text-center">Seret langkah-langkah ke sini dalam urutan yang benar</p>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6">
                    <button onclick="Decomposition.checkStepOrder()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-4">
                        Periksa Urutan
                    </button>
                    <button onclick="Decomposition.resetSteps()" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                        Reset
                    </button>
                </div>
                
                <div id="step-feedback" class="mt-4"></div>
            </div>
        `;
    }

    static dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.step);
        event.target.classList.add('dragging');
    }

    static dragEnd(event) {
        event.target.classList.remove('dragging');
    }

    static dragOver(event) {
        event.preventDefault();
        event.currentTarget.classList.add('drag-over');
    }

    static drop(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('drag-over');
        
        const stepId = event.dataTransfer.getData('text/plain');
        const stepElement = document.querySelector(`[data-step="${stepId}"]`);
        
        if (stepElement && event.currentTarget.id === 'step-target') {
            // Remove the placeholder text if it exists
            if (event.currentTarget.querySelector('p')) {
                event.currentTarget.innerHTML = '';
            }
            
            // Add to target area
            event.currentTarget.appendChild(stepElement);
            stepElement.classList.remove('dragging');
        }
    }

    static checkStepOrder() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const targetArea = document.getElementById('step-target');
        const orderedSteps = Array.from(targetArea.children)
            .map(element => parseInt(element.dataset.step));

        const correctOrder = question.steps
            .sort((a, b) => a.order - b.order)
            .map(step => step.id);

        const isCorrect = orderedSteps.length === correctOrder.length &&
            orderedSteps.every((stepId, index) => stepId === correctOrder[index]);

        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = orderedSteps;

        // Show feedback
        const feedbackDiv = document.getElementById('step-feedback');
        feedbackDiv.innerHTML = `
            <div class="p-4 rounded-lg ${isCorrect ? 'success-message border' : 'error-message border'}">
                <div class="flex items-center">
                    <i data-feather="${isCorrect ? 'check-circle' : 'x-circle'}" class="w-5 h-5 mr-2"></i>
                    <strong>${isCorrect ? 'Benar!' : 'Kurang Tepat'}</strong>
                </div>
                <p class="mt-2">${question.explanation}</p>
                ${!isCorrect ? `
                    <div class="mt-3">
                        <strong>Urutan yang benar:</strong>
                        <ol class="list-decimal list-inside mt-2">
                            ${correctOrder.map(stepId => {
                                const step = question.steps.find(s => s.id === stepId);
                                return `<li>${step.text}</li>`;
                            }).join('')}
                        </ol>
                    </div>
                ` : ''}
            </div>
        `;

        // Disable drag and drop
        document.querySelectorAll('.step-item').forEach(item => {
            item.draggable = false;
            item.classList.remove('draggable');
        });

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }

    static resetSteps() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const sourceArea = document.getElementById('step-source');
        const targetArea = document.getElementById('step-target');
        
        // Move all steps back to source
        const stepElements = targetArea.querySelectorAll('.step-item');
        stepElements.forEach(element => {
            sourceArea.appendChild(element);
        });
        
        // Reset target area
        targetArea.innerHTML = '<p class="text-gray-500 text-center">Seret langkah-langkah ke sini dalam urutan yang benar</p>';
        
        // Clear feedback
        document.getElementById('step-feedback').innerHTML = '';
    }
}
