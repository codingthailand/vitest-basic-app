export function getGrade(score: number) {
    if (score < 0 || score > 100) {
        throw new RangeError('Score must be between 0 and 100')
    }

    if (score >= 80) return 'A'
    if (score >= 70) return 'B'
    if (score >= 60) return 'C'
    if (score >= 50) return 'D'
    return 'F'
}