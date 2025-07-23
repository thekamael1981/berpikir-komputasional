// Abstraction module for filtering relevant information
class Abstraction {
    static loadQuestion(question, container) {
        switch (question.subtype) {
            case 'information-filter':
                this.loadInformationFilter(question, container);
                break;
            case 'key-details':
                this.loadKeyDetails(question, container);
                break;
            case 'categorization':
                this.loadCategorization(question, container);
                break;
            default:
                app.loadMultipleChoice(question, container);
        }
    }

    static loadInformationFilter(question, container) {
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h4 class="font-medium text-blue-800 mb-2">Situasi:</h4>
                    <p class="text-blue-700">${question.scenario}</p>
                </div>
                
                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Pilih informasi yang RELEVAN untuk ${question.goal}:</h4>
                    <div class="space-y-3">
                        ${question.informationItems.map((item, index) => `
                            <div class="info-item border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50" onclick="Abstraction.toggleInformation(${index})">
                                <div class="flex items-center">
                                    <input type="checkbox" class="mr-3" id="info-${index}">
                                    <label for="info-${index}" class="cursor-pointer flex-1">${item.text}</label>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <button onclick="Abstraction.checkInformationFilter()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Periksa Pilihan
                </button>
                
                <div id="filter-feedback" class="mt-4"></div>
            </div>
        `;
    }

    static toggleInformation(index) {
        const checkbox = document.getElementById(`info-${index}`);
        checkbox.checked = !checkbox.checked;
    }

    static checkInformationFilter() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const selectedItems = [];
        
        question.informationItems.forEach((item, index) => {
            const checkbox = document.getElementById(`info-${index}`);
            if (checkbox.checked) {
                selectedItems.push(index);
            }
        });

        // Check if selection matches relevant items
        const relevantItems = question.informationItems
            .map((item, index) => item.relevant ? index : null)
            .filter(index => index !== null);
        
        const isCorrect = selectedItems.length === relevantItems.length &&
            selectedItems.every(index => relevantItems.includes(index));

        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = selectedItems;

        // Update visual feedback
        question.informationItems.forEach((item, index) => {
            const itemDiv = document.querySelectorAll('.info-item')[index];
            const checkbox = document.getElementById(`info-${index}`);
            
            if (item.relevant) {
                itemDiv.classList.add('border-green-500', 'bg-green-50');
            } else if (checkbox.checked) {
                itemDiv.classList.add('border-red-500', 'bg-red-50');
            }
            
            // Disable further selection
            itemDiv.style.pointerEvents = 'none';
        });

        // Show feedback
        const feedbackDiv = document.getElementById('filter-feedback');
        feedbackDiv.innerHTML = `
            <div class="p-4 rounded-lg ${isCorrect ? 'success-message border' : 'error-message border'}">
                <div class="flex items-center">
                    <i data-feather="${isCorrect ? 'check-circle' : 'x-circle'}" class="w-5 h-5 mr-2"></i>
                    <strong>${isCorrect ? 'Benar!' : 'Kurang Tepat'}</strong>
                </div>
                <p class="mt-2">${question.explanation}</p>
                ${!isCorrect ? `
                    <div class="mt-3">
                        <strong>Informasi yang relevan:</strong>
                        <ul class="list-disc list-inside mt-2">
                            ${relevantItems.map(index => `<li>${question.informationItems[index].text}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }

    static loadKeyDetails(question, container) {
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <h4 class="font-medium text-gray-800 mb-2">Teks untuk dianalisis:</h4>
                    <div class="text-gray-700 leading-relaxed" id="text-content">
                        ${question.text}
                    </div>
                </div>
                
                <div class="mb-6">
                    <h4 class="font-medium text-gray-800 mb-3">Klik pada kalimat yang mengandung detail KUNCI:</h4>
                    <p class="text-sm text-gray-600 mb-3">Pilih hanya informasi yang paling penting dan relevan.</p>
                    <div class="space-y-2" id="sentences-container">
                        ${question.sentences.map((sentence, index) => `
                            <div class="sentence-item border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50" onclick="Abstraction.toggleSentence(${index})">
                                <div class="flex items-start">
                                    <input type="checkbox" class="mr-3 mt-1" id="sentence-${index}">
                                    <label for="sentence-${index}" class="cursor-pointer flex-1">${sentence.text}</label>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <button onclick="Abstraction.checkKeyDetails()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Periksa Detail Kunci
                </button>
                
                <div id="details-feedback" class="mt-4"></div>
            </div>
        `;
    }

    static toggleSentence(index) {
        const checkbox = document.getElementById(`sentence-${index}`);
        checkbox.checked = !checkbox.checked;
    }

    static checkKeyDetails() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const selectedSentences = [];
        
        question.sentences.forEach((sentence, index) => {
            const checkbox = document.getElementById(`sentence-${index}`);
            if (checkbox.checked) {
                selectedSentences.push(index);
            }
        });

        // Check if selection matches key sentences
        const keySentences = question.sentences
            .map((sentence, index) => sentence.isKey ? index : null)
            .filter(index => index !== null);
        
        const isCorrect = selectedSentences.length === keySentences.length &&
            selectedSentences.every(index => keySentences.includes(index));

        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = selectedSentences;

        // Update visual feedback
        question.sentences.forEach((sentence, index) => {
            const sentenceDiv = document.querySelectorAll('.sentence-item')[index];
            const checkbox = document.getElementById(`sentence-${index}`);
            
            if (sentence.isKey) {
                sentenceDiv.classList.add('border-green-500', 'bg-green-50');
            } else if (checkbox.checked) {
                sentenceDiv.classList.add('border-red-500', 'bg-red-50');
            }
            
            // Disable further selection
            sentenceDiv.style.pointerEvents = 'none';
        });

        // Show feedback
        const feedbackDiv = document.getElementById('details-feedback');
        feedbackDiv.innerHTML = `
            <div class="p-4 rounded-lg ${isCorrect ? 'success-message border' : 'error-message border'}">
                <div class="flex items-center">
                    <i data-feather="${isCorrect ? 'check-circle' : 'x-circle'}" class="w-5 h-5 mr-2"></i>
                    <strong>${isCorrect ? 'Benar!' : 'Kurang Tepat'}</strong>
                </div>
                <p class="mt-2">${question.explanation}</p>
                ${!isCorrect ? `
                    <div class="mt-3">
                        <strong>Detail kunci yang seharusnya dipilih:</strong>
                        <ul class="list-disc list-inside mt-2">
                            ${keySentences.map(index => `<li>${question.sentences[index].text}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }

    static loadCategorization(question, container) {
        container.innerHTML = `
            <div class="fade-in">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">${question.question}</h3>
                <p class="text-gray-600 mb-6">${question.context}</p>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-medium text-gray-800 mb-3">Item untuk dikategorikan:</h4>
                        <div id="items-source" class="space-y-2">
                            ${question.items.map((item, index) => `
                                <div class="category-item draggable bg-gray-100 border border-gray-300 rounded-lg p-3 cursor-move" 
                                     draggable="true" 
                                     data-item="${item.id}"
                                     ondragstart="Abstraction.dragStart(event)"
                                     ondragend="Abstraction.dragEnd(event)">
                                    ${item.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        ${question.categories.map((category, index) => `
                            <div>
                                <h4 class="font-medium text-gray-800 mb-2">${category.name}:</h4>
                                <div class="category-drop drag-area min-h-24" 
                                     data-category="${category.id}"
                                     ondragover="Abstraction.dragOver(event)"
                                     ondrop="Abstraction.drop(event)">
                                    <p class="text-gray-500 text-sm text-center">Seret item ke sini</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mt-6">
                    <button onclick="Abstraction.checkCategorization()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-4">
                        Periksa Kategorisasi
                    </button>
                    <button onclick="Abstraction.resetCategorization()" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                        Reset
                    </button>
                </div>
                
                <div id="categorization-feedback" class="mt-4"></div>
            </div>
        `;
    }

    static dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.item);
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
        
        const itemId = event.dataTransfer.getData('text/plain');
        const itemElement = document.querySelector(`[data-item="${itemId}"]`);
        
        if (itemElement && event.currentTarget.classList.contains('category-drop')) {
            // Remove placeholder text if it exists
            const placeholder = event.currentTarget.querySelector('p');
            if (placeholder) {
                placeholder.remove();
            }
            
            // Add to category
            event.currentTarget.appendChild(itemElement);
            itemElement.classList.remove('dragging');
        }
    }

    static checkCategorization() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const userCategorization = {};
        
        // Get user's categorization
        question.categories.forEach(category => {
            const categoryDiv = document.querySelector(`[data-category="${category.id}"]`);
            const items = Array.from(categoryDiv.children)
                .filter(child => child.dataset.item)
                .map(child => parseInt(child.dataset.item));
            userCategorization[category.id] = items;
        });

        // Check correctness
        let isCorrect = true;
        question.items.forEach(item => {
            const userCategory = Object.keys(userCategorization).find(categoryId => 
                userCategorization[categoryId].includes(item.id)
            );
            if (userCategory !== item.categoryId) {
                isCorrect = false;
            }
        });

        // Store answer
        app.moduleAnswers[app.currentQuestionIndex] = userCategorization;

        // Update visual feedback
        document.querySelectorAll('.category-item').forEach(item => {
            const itemId = parseInt(item.dataset.item);
            const correctCategory = question.items.find(i => i.id === itemId).categoryId;
            const currentCategory = Object.keys(userCategorization).find(categoryId => 
                userCategorization[categoryId].includes(itemId)
            );
            
            if (currentCategory === correctCategory) {
                item.classList.add('border-green-500', 'bg-green-50');
            } else {
                item.classList.add('border-red-500', 'bg-red-50');
            }
            
            // Disable drag
            item.draggable = false;
            item.classList.remove('draggable');
        });

        // Show feedback
        const feedbackDiv = document.getElementById('categorization-feedback');
        feedbackDiv.innerHTML = `
            <div class="p-4 rounded-lg ${isCorrect ? 'success-message border' : 'error-message border'}">
                <div class="flex items-center">
                    <i data-feather="${isCorrect ? 'check-circle' : 'x-circle'}" class="w-5 h-5 mr-2"></i>
                    <strong>${isCorrect ? 'Benar!' : 'Kurang Tepat'}</strong>
                </div>
                <p class="mt-2">${question.explanation}</p>
                ${!isCorrect ? `
                    <div class="mt-3">
                        <strong>Kategorisasi yang benar:</strong>
                        <ul class="list-disc list-inside mt-2">
                            ${question.categories.map(category => {
                                const correctItems = question.items.filter(item => item.categoryId === category.id);
                                return `<li><strong>${category.name}:</strong> ${correctItems.map(item => item.text).join(', ')}</li>`;
                            }).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;

        // Save progress
        Progress.updateQuestionProgress(app.currentGrade, app.currentTopic, app.currentQuestionIndex, isCorrect);

        // Re-initialize Feather icons
        feather.replace();
    }

    static resetCategorization() {
        const question = app.currentQuestions[app.currentQuestionIndex];
        const sourceArea = document.getElementById('items-source');
        
        // Move all items back to source
        document.querySelectorAll('.category-item').forEach(item => {
            sourceArea.appendChild(item);
        });
        
        // Reset category areas
        document.querySelectorAll('.category-drop').forEach(category => {
            category.innerHTML = '<p class="text-gray-500 text-sm text-center">Seret item ke sini</p>';
        });
        
        // Clear feedback
        document.getElementById('categorization-feedback').innerHTML = '';
    }
}
