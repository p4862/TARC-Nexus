import favorites from './favorites'
import votes from './votes'
import comments from './comments'
const engagement = {
    favorites: Object.assign(favorites, favorites),
votes: Object.assign(votes, votes),
comments: Object.assign(comments, comments),
}

export default engagement