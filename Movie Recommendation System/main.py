from utils.recommend import *

import pandas as pd

# Load data
ratings = pd.read_csv('./data/u.data', sep='\t', names=['user_id', 'movie_id', 'rating', 'timestamp'])
movies = pd.read_csv('./data/u.item', sep='|', encoding='latin-1', header=None, usecols=[0, 1], names=['movie_id', 'title'])
df = pd.merge(ratings, movies, on='movie_id')

# Build model
user_movie_matrix = get_user_movie_matrix(df)
similarity_df = compute_similarity(user_movie_matrix)


# Recommend
#print(df['title'].unique())
#print([title for title in df['title'].unique() if 'Toy Story' in title])
print("Similarity matrix index sample:", similarity_df.index[:10])

print('Toy Story (1995)' in similarity_df.index)  # Should return True


recommended = get_similar_movies('Toy Story (1995)', similarity_df, top_n=5)
print("Recommended movies:", recommended)
