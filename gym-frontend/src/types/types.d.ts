type Employee = {
    id: number
    name: string
    role: string
    cpf: string
    email: string
    wage: number
    createdAt: string
    updatedAt: string
    workouts?: Workout[]
}

type Member = {
    id: number
    name: string
    membership: 'silver' | 'platinum' | 'gold'
    cpf: string
    email: string
    createdAt: string
    updatedAt: string
    workouts?: Workout[]
}

type Workout = {
    id: number
    exercises: Exercise[]
    personalId: number
    memberId: number
    createdAt: string
    updatedAt: string
}

type Exercise = {
    name: string
    reps: number
    interval: number
}
