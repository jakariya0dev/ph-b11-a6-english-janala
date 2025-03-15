const getCategoryData = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all').
    then(res => res.json()).
    then(data => showCategory(data.data));
}

const showCategory = (data) => {

    const categoryContainer = document.getElementById('category-button');

    data.map(item => {

        categoryContainer.innerHTML += `<button onclick="getVocabularyByCategory(this.id)" id="${item.level_no}" class="btn btn-primary btn-outline"> 
                                            <i class="fa-solid fa-book-open"></i> 
                                            ${item.lessonName}
                                        </button>`;
    })
    
    
}

const getVocabularyByCategory = (id) => {
    
    fetch('https://openapi.programming-hero.com/api/level/'+id).
    then(res => res.json()).
    then(data => showVocabularyBaCategory(data.data));
}

const showVocabularyBaCategory = (data) => {

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
                                        <span class="bg-blue-100 px-3 py-2 text-xl rounded-lg"><i class="fa-solid fa-circle-exclamation"></i></span>
                                        <span class="bg-blue-100 px-3 py-2 text-xl rounded-lg"><i class="fa-solid fa-volume-low"></i></span>
                                    </div>
                                </div>
                            </div>
                    `;
        
    });

    vocabularyContainer.append(child);
    console.log(data);
    
}
getCategoryData();
