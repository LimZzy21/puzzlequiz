interface quizz{
    type:string
    difficulty:string
    category:string
    question:string
    correct_answer:string
    incorrect_answers:string[]
}

export interface quizzBackend {
    responce_code:number
    results:quizz[]
}