import numpy as np
import pandas as pd
import itertools

df_apr17 = pd.read_csv('apr17.csv')

df_cen = pd.read_csv('90_ncr_centroids_FINAL.csv')

arr_xjoin = list(itertools.product(np.arange(0,90), np.arange(0,24))
)
df_cls_hour = pd.DataFrame(arr_xjoin, columns=['cls','hour'])

df_apr17 = df_apr17.merge(df_cls_hour, on=['cls','hour'], how='right')

df_apr17 = df_apr17.pivot(index='cls',columns=['hour'],values='coeff_sigma')

df_apr17 = df_apr17.reset_index()

df_apr17 = df_apr17.merge(df_cen, on='cls')

df_apr17.set_index('cls')

df_apr17['day'] = 20150417

df_apr17.to_csv('sample_20150417.csv')
