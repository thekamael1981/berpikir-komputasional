// Algorithm Design module for creating structured solutions
class Algorithm {
    static loadQuestion(question, container) {
        switch (question.subtype) {
            case 'flowchart':
                this.loadFlowchartBuilder(question, container);
                break;
            case 'pseudocode':
                this.loadPseudocodeBuilder(question, container);
                break;
            case 'step-sequence':
                this.loadStepSequence(question, container);
                break;
            default:
                app.loadMultipleChoice(question, container);
        }
    }

    static loadFlowchartBuilder(question, container) {
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <p class="text-gray-600 mb-6">${question.context}</p>
                
                <div class="grid lg:grid-cols-3 gap-6">
                    <div>
                        <h4 class="font-medium text-gray-800 mb-3">Komponen Flowchart:</h4>
                        <div class="space-y-2" id="flowchart-components">
                            ${question.components.map((component, index) => `
                                <div class="flowchart-component draggable bg-white border-2 border-gray-300 rounded-lg p-3 cursor-move ${component.type}" 
                                     draggable="true" 
                                     data-component="${component.id}"
                                     ondragstart="Algorithm.dragStart(event)"
                                     ondragend="Algorithm.dragEnd(event)">
                                    <div class="flex items-center">
                                        <i data-feather="${this.getComponentIcon(component.type)}" class="w-4 h-4 mr-2"></i>
                                        ${component.text}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="lg:col-span-2">
                        <h4 class="font-medium text-gray-800 mb-3">Area Flowchart:</h4>
                        <div id="flowchart-area" class="drag-area border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-96"
                             ondragover="Algorithm.dragOver(event)"
                             ondrop="Algorithm.drop(event)">
                            <p class="text-gray-500 text-center">Seret komponen ke sini untuk membuat flowchart</p>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6">
                    <button onclick="Algorithm.checkFlowchart()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-4">
                        Periksa Flowchart
                    </button>
                    <button onclick="Algorithm.clearFlowchart()" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                        Hapus Semua
                    </button>
                </div>
                
                <div id="flowchart-feedback" class="mt-4"></div>
            </div>
        `;

        // Initialize user flowchart
        this.userFlowchart = [];

        // Re-initialize Feather icons
        feather.replace();
    }

    static getComponentIcon(type) {
        const iconMap = {
            'start': 'play',
            'end': 'square',
            'process': 'cpu',
            'decision': 'help-circle',
            'input': 'edit',
            'output': 'printer'
        };
        return iconMap[type] || 'circle';
    }

    static dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.component);
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
        
        const componentId = event.dataTransfer.getData('text/plain');
        const originalComponent = document.querySelector(`[data-component="${componentId}"]`);
        
        if (originalComponent && event.currentTarget.id === 'flowchart-area') {
            // Remove placeholder text if it exists
            const placeholder = event.currentTarget.querySelector('p');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Clone the component
            const clonedComponent = originalComponent.cloneNode(true);
            clonedComponent.classList.remove('dragging');
            clonedComponent.onclick = () => Algorithm.removeFromFlowchart(clonedComponent);
            clonedComponent.draggable = false;
            clonedComponent.title = 'Klik untuk menghapus';
            
            // Add to flowchart area
            event.currentTarget.appendChild(clonedComponent);
            
            // Track the order
            this.userFlowchart.push(parseInt(componentId));
        }
    }

    static removeFromFlowchart(element) {
        const componentId = parseInt(element.dataset.component);
        this.userFlowchart = this.userFlowchart.filter(id => id !== componentId);
        element.remove();
        
        // Restore placeholder if empty
        const flowchartArea = document.getElementById('flowchart-area');
        if (flowchartArea.children.length === 0) {
            flowchartArea.innerHTML = '<p class="text-gray-500 text-center">Seret komponen ke sini untuk membuat flowchart</p>';
        }
    }

    static checkFlowchart() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const correctSequence = question.correctSequence;
        
        const isCorrect = this.userFlowchart.length === correctSequence.length &&
            this.userFlowchart.every((id, index) => id === correctSequence[index]);

        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = this.userFlowchart;

        // Update visual feedback
        const flowchartItems = document.querySelectorAll('#flowchart-area .flowchart-component');
        flowchartItems.forEach((item, index) => {
            const componentId = parseInt(item.dataset.component);
            const correctId = correctSequence[index];
            
            if (componentId === correctId) {
                item.classList.add('border-green-500', 'bg-green-50');
            } else {
                item.classList.add('border-red-500', 'bg-red-50');
            }
            
            // Disable interaction
            item.onclick = null;
            item.style.cursor = 'default';
        });

        // Show feedback
        const feedbackDiv = document.getElementById('flowchart-feedback');
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
                            ${correctSequence.map(id => {
                                const component = question.components.find(c => c.id === id);
                                return `<li>${component.text}</li>`;
                            }).join('')}
                        </ol>
                    </div>
                ` : ''}
            </div>
        `;

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }

    static clearFlowchart() {
        this.userFlowchart = [];
        const flowchartArea = document.getElementById('flowchart-area');
        flowchartArea.innerHTML = '<p class="text-gray-500 text-center">Seret komponen ke sini untuk membuat flowchart</p>';
        document.getElementById('flowchart-feedback').innerHTML = '';
    }

    static loadPseudocodeBuilder(question, container) {
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <p class="text-gray-600 mb-6">${question.context}</p>
                
                <div class="grid lg:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-medium text-gray-800 mb-3">Baris Pseudocode:</h4>
                        <div class="space-y-2" id="pseudocode-lines">
                            ${question.lines.map((line, index) => `
                                <div class="pseudocode-line draggable bg-gray-100 border border-gray-300 rounded-lg p-3 cursor-move font-mono text-sm" 
                                     draggable="true" 
                                     data-line="${line.id}"
                                     ondragstart="Algorithm.dragStart(event)"
                                     ondragend="Algorithm.dragEnd(event)">
                                    ${line.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-medium text-gray-800 mb-3">Pseudocode yang Benar:</h4>
                        <div id="pseudocode-area" class="drag-area border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-64 bg-gray-50"
                             ondragover="Algorithm.dragOver(event)"
                             ondrop="Algorithm.dropPseudocode(event)">
                            <p class="text-gray-500 text-center">Seret baris pseudocode ke sini dalam urutan yang benar</p>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6">
                    <button onclick="Algorithm.checkPseudocode()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-4">
                        Periksa Pseudocode
                    </button>
                    <button onclick="Algorithm.clearPseudocode()" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                        Hapus Semua
                    </button>
                </div>
                
                <div id="pseudocode-feedback" class="mt-4"></div>
            </div>
        `;

        // Initialize user pseudocode
        this.userPseudocode = [];
    }

    static dropPseudocode(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('drag-over');
        
        const lineId = event.dataTransfer.getData('text/plain');
        const originalLine = document.querySelector(`[data-line="${lineId}"]`);
        
        if (originalLine && event.currentTarget.id === 'pseudocode-area') {
            // Remove placeholder text if it exists
            const placeholder = event.currentTarget.querySelector('p');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Clone the line
            const clonedLine = originalLine.cloneNode(true);
            clonedLine.classList.remove('dragging');
            clonedLine.onclick = () => Algorithm.removeFromPseudocode(clonedLine);
            clonedLine.draggable = false;
            clonedLine.title = 'Klik untuk menghapus';
            clonedLine.classList.add('bg-white');
            
            // Add to pseudocode area
            event.currentTarget.appendChild(clonedLine);
            
            // Track the order
            this.userPseudocode.push(parseInt(lineId));
        }
    }

    static removeFromPseudocode(element) {
        const lineId = parseInt(element.dataset.line);
        this.userPseudocode = this.userPseudocode.filter(id => id !== lineId);
        element.remove();
        
        // Restore placeholder if empty
        const pseudocodeArea = document.getElementById('pseudocode-area');
        if (pseudocodeArea.children.length === 0) {
            pseudocodeArea.innerHTML = '<p class="text-gray-500 text-center">Seret baris pseudocode ke sini dalam urutan yang benar</p>';
        }
    }

    static checkPseudocode() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const correctSequence = question.correctSequence;
        
        const isCorrect = this.userPseudocode.length === correctSequence.length &&
            this.userPseudocode.every((id, index) => id === correctSequence[index]);

        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = this.userPseudocode;

        // Update visual feedback
        const pseudocodeItems = document.querySelectorAll('#pseudocode-area .pseudocode-line');
        pseudocodeItems.forEach((item, index) => {
            const lineId = parseInt(item.dataset.line);
            const correctId = correctSequence[index];
            
            if (lineId === correctId) {
                item.classList.add('border-green-500', 'bg-green-50');
            } else {
                item.classList.add('border-red-500', 'bg-red-50');
            }
            
            // Disable interaction
            item.onclick = null;
            item.style.cursor = 'default';
        });

        // Show feedback
        const feedbackDiv = document.getElementById('pseudocode-feedback');
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
                        <ol class="list-decimal list-inside mt-2 font-mono text-sm">
                            ${correctSequence.map(id => {
                                const line = question.lines.find(l => l.id === id);
                                return `<li>${line.text}</li>`;
                            }).join('')}
                        </ol>
                    </div>
                ` : ''}
            </div>
        `;

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }

    static clearPseudocode() {
        this.userPseudocode = [];
        const pseudocodeArea = document.getElementById('pseudocode-area');
        pseudocodeArea.innerHTML = '<p class="text-gray-500 text-center">Seret baris pseudocode ke sini dalam urutan yang benar</p>';
        document.getElementById('pseudocode-feedback').innerHTML = '';
    }

    static loadStepSequence(question, container) {
        // Shuffle the steps for display
        const shuffledSteps = Shuffle.array([...question.steps]);
        
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <p class="text-gray-600 mb-6">${question.context}</p>
                
                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Urutkan langkah-langkah berikut:</h4>
                    <div class="space-y-3">
                        ${shuffledSteps.map((step, index) => `
                            <div class="step-sequence-item border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50" onclick="Algorithm.selectStep(${step.id})">
                                <div class="flex items-center">
                                    <div class="step-number w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium mr-4" id="step-${step.id}">
                                        ?
                                    </div>
                                    <div class="flex-1">
                                        ${step.text}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Instruksi:</h4>
                    <p class="text-sm text-gray-600">Klik pada langkah-langkah dalam urutan yang benar (1, 2, 3, ...)</p>
                    <div class="mt-2">
                        <button onclick="Algorithm.resetStepSequence()" class="text-blue-600 hover:text-blue-800 text-sm">Reset Urutan</button>
                    </div>
                </div>
                
                <button onclick="Algorithm.checkStepSequence()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Periksa Urutan
                </button>
                
                <div id="step-sequence-feedback" class="mt-4"></div>
            </div>
        `;

        // Initialize step sequence tracking
        this.stepSequenceOrder = [];
        this.currentStepNumber = 1;
    }

    static selectStep(stepId) {
        // Check if step is already selected
        if (this.stepSequenceOrder.includes(stepId)) {
            return;
        }

        // Add to sequence
        this.stepSequenceOrder.push(stepId);
        
        // Update visual
        const stepNumber = document.getElementById(`step-${stepId}`);
        stepNumber.textContent = this.currentStepNumber;
        stepNumber.classList.remove('bg-gray-200');
        stepNumber.classList.add('bg-blue-500', 'text-white');
        
        // Disable the step
        const stepItem = stepNumber.closest('.step-sequence-item');
        stepItem.style.pointerEvents = 'none';
        stepItem.classList.add('bg-gray-50');
        
        this.currentStepNumber++;
    }

    static resetStepSequence() {
        this.stepSequenceOrder = [];
        this.currentStepNumber = 1;
        
        // Reset all step visuals
        document.querySelectorAll('.step-number').forEach(stepNumber => {
            stepNumber.textContent = '?';
            stepNumber.className = 'step-number w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium mr-4';
        });
        
        document.querySelectorAll('.step-sequence-item').forEach(item => {
            item.style.pointerEvents = 'auto';
            item.classList.remove('bg-gray-50');
        });
        
        document.getElementById('step-sequence-feedback').innerHTML = '';
    }

    static checkStepSequence() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const correctSequence = question.steps
            .sort((a, b) => a.order - b.order)
            .map(step => step.id);
        
        const isCorrect = this.stepSequenceOrder.length === correctSequence.length &&
            this.stepSequenceOrder.every((id, index) => id === correctSequence[index]);

        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = this.stepSequenceOrder;

        // Update visual feedback
        this.stepSequenceOrder.forEach((stepId, index) => {
            const stepNumber = document.getElementById(`step-${stepId}`);
            const correctOrder = correctSequence.indexOf(stepId) + 1;
            const userOrder = index + 1;
            
            if (userOrder === correctOrder) {
                stepNumber.classList.remove('bg-blue-500');
                stepNumber.classList.add('bg-green-500');
            } else {
                stepNumber.classList.remove('bg-blue-500');
                stepNumber.classList.add('bg-red-500');
            }
        });

        // Show feedback
        const feedbackDiv = document.getElementById('step-sequence-feedback');
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
                            ${correctSequence.map(id => {
                                const step = question.steps.find(s => s.id === id);
                                return `<li>${step.text}</li>`;
                            }).join('')}
                        </ol>
                    </div>
                ` : ''}
            </div>
        `;

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }
}
