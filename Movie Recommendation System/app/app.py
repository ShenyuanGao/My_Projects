import streamlit as st
import pandas as pd
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from utils.recommend import *
df = load_data()
user_movie_matrix = get_user_movie_matrix(df)
similarity_df = compute_similarity(user_movie_matrix)

movie = st.selectbox("Choose a movie:", user_movie_matrix.columns.sort_values())
recommendations = get_similar_movies(movie, similarity_df)

st.write("Top recommendations:")
st.dataframe(recommendations)
