import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def load_data():
    ratings = pd.read_csv('data/u.data', sep='\t', names=['user_id', 'movie_id', 'rating', 'timestamp'])
    movies = pd.read_csv('data/u.item', sep='|', encoding='latin-1', header=None, usecols=[0, 1], names=['movie_id', 'title'])
    return pd.merge(ratings, movies, on='movie_id')

def get_user_movie_matrix(df):
    return df.pivot_table(index='user_id', columns='title', values='rating')

def compute_similarity(matrix):
    sim = cosine_similarity(matrix.T.fillna(0))
    return pd.DataFrame(sim, index=matrix.columns, columns=matrix.columns)

def get_similar_movies(title, similarity_df, top_n=5):
    if title not in similarity_df.index:
        return pd.DataFrame({"Message": ["Movie not found"]})
    
    similar_scores = similarity_df[title].sort_values(ascending=False)[1:top_n+1]
    return similar_scores.to_frame(name="Similarity")
