const getCategoryData = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all').
    then(res => res.json()).
    then(data => showCategory(data.data));
}

const showCategory = (data) => {

    const categoryContainer = document.getElementById('category-button');

    data.map(item => {

        categoryContainer.innerHTML += `<button onclick="getVocabularyByCategory(this.id)" id="${item.level_no}" class="btn btn-primary btn-outline btn-category"> 
                                            <i class="fa-solid fa-book-open"></i> 
                                            ${item.lessonName}
                                        </button>`;
    })
    
    
}


const getVocabularyByCategory = (id) => {

    makeCategoryButtonActive(id);

    showingLoader();
    
    fetch('https://openapi.programming-hero.com/api/level/'+id).
    then(res => res.json()).
    then(data => {

        
        showVocabularyByCategory(data.data)
    });
}

const showVocabularyByCategory = (data) => {

    const vocabularyContainer = document.getElementById('vocabulary-container');
    vocabularyContainer.innerHTML = '';

    // handle no data found
     if(data.length === 0) {
         vocabularyContainer.innerHTML = `
                                         <div class="font-anek text-center my-10 space-y-4 bg-blue-100 py-20 rounded-lg">
                                             <span class="text-5xl text-red-500 block"><i class="fa-solid fa-triangle-exclamation"></i></span>
                                             <p>এই lesson এ এখনো কোনো Vocabulary যুক্ত করা হয়নি</p>
                                             <p class="text-4xl font-medium">নেক্সট Lesson এ যান</p>
                                         </div>
                                         `;
         return;
     }
 
    const child = document.createElement('div');
    child.classList.add('grid', 'grid-cols-3', 'gap-5', 'bg-blue-100', 'rounded-lg', 'p-5');

    data.forEach(item => {
        
        child.innerHTML += `
                            <div class="card rounded-lg bg-white text-center">
                                <div class="card-body pt-10 space-y-2">
                                    <h3 class="text-2xl font-bold">${item.word}</h3>
                                    <p class="text-sm font-anek">উচ্চারণ: ${item.pronunciation}</p>
                                    <h3 class="text-2xl font-bold font-anek">অর্থ: ${item.meaning ?? 'নেই'}</h3>
                                    <div class="flex justify-between mt-10">
                                        <button onclick="getSingleVocabularyData(${item.id})" class="bg-blue-100 px-3 py-2 text-xl rounded-lg">
                                            <i class="fa-solid fa-circle-exclamation"></i>
                                        </button>
                                        <button onclick="pronounceWord('${item.word}')" class="bg-blue-100 px-3 py-2 text-xl rounded-lg">
                                            <i class="fa-solid fa-volume-low"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
       
                    `;
        
    });

    vocabularyContainer.append(child);
    // console.log(data);
    
}

const getSingleVocabularyData = (id) => {

    fetch('https://openapi.programming-hero.com/api/word/'+id).
    then(res => res.json()).
    then(data => showSingleVocabularyData(data.data));

    // single_word_modal.showModal()

}

const showSingleVocabularyData = (item) => {

    const modalDiv = document.getElementById('word-modal');

    console.log(modalDiv);
    
    
    const modal = `
                    <dialog id="single_word_modal" class="modal">
                        <div class="modal-box">
                            <h3 class="text-lg font-bold mb-5">${item.word} ( <i class="fa-solid fa-microphone-lines"></i> ${item.pronunciation})</h3>
                            <p class="font-bold">Meaning</p>
                            <p class="mb-5">${item.meaning ?? 'নেই'}</p>
                            <p class="font-bold">Example</p>
                            <p class="mb-5">${item.sentence}</p>
                            <p class="font-bold mb-2">সমার্থক শব্দ গুলো</p>
                            <div class="flex flex-wrap gap-2 mb-5">
                                ${item.synonyms.length == 0 ? 'নেই' : item.synonyms.map(synonym => `<span class="bg-blue-100 px-2 py-1 rounded-md border-1">${synonym}</span>`).join('')}
                            </div>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn btn-primary">Complete Learning</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                `;
        modalDiv.innerHTML = modal;
    single_word_modal.showModal();
}

const makeCategoryButtonActive = (id) => {
    const buttons = document.querySelectorAll('.btn-category');
    buttons.forEach(button => {
        button.classList.remove('bg-blue-600', 'text-white');
        
    })

    const activeButton = document.getElementById(id);
    activeButton.classList.add('bg-blue-600', 'text-white');

    
}

const showingLoader = () => {
    const vocabularyContainer = document.getElementById('vocabulary-container');
        vocabularyContainer.innerHTML = `
        <div class="font-anek text-center my-10 bg-blue-100 py-20 rounded-lg">
                <span class="loading loading-spinner loading-xl"></span>
            </div>
        `;
}

 function pronounceWord(word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-EN'; // English
      window.speechSynthesis.speak(utterance);
    }

const userLogin = () => {
    
    const userName = document.getElementById('userName').value.trim();
    const userPassword = document.getElementById('userPassword').value.trim();

    if(userName == '') {
        // alert('Invalid Username name');

        Swal.fire({
            title: "Inavalid Username?",
            text: "Check your username again",
            icon: "error"
        });
        
    } 
    else if(userPassword !== '123456') {

         Swal.fire({
            title: "Inavalid Password?",
            text: "Check your password again",
            icon: "error"
        });
        
    }
    else {
        document.getElementById('hero').classList.add('hidden');
        document.getElementById('nav').classList.remove('hidden');
        document.getElementById('study').classList.remove('hidden');
        document.getElementById('faq').classList.remove('hidden');

         Swal.fire({
            title: "Login Successful",
            icon: "success"
        });
    }

}

const userLogout = () => {
    document.getElementById('hero').classList.remove('hidden');
    document.getElementById('nav').classList.add('hidden');
    document.getElementById('study').classList.add('hidden');
    document.getElementById('faq').classList.add('hidden');

    Swal.fire({
        title: "Logout Successful",
        icon: "success"
    });
}

getCategoryData();
