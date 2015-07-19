import numpy as np
import pandas as pd
import itertools

df_apr30 = pd.read_csv('apr30.csv')

df_cen = pd.read_csv('90_ncr_centroids_FINAL.csv')

arr_xjoin = list(itertools.product(np.arange(0,90), np.arange(0,24))
)
df_cls_hour = pd.DataFrame(arr_xjoin, columns=['cls','hour'])

df_apr30 = df_apr30.merge(df_cls_hour, on=['cls','hour'], how='outer')

df_apr30 = df_apr30.pivot(index='cls',columns='hour', values='coeff_sigma')

df_apr30 = df_apr30.reset_index()

df_apr30 = df_apr30.merge(df_cen, on='cls')

df_apr30.set_index('cls')

df_apr30['day'] = 20150430

df_apr30.to_csv('sample_20150430.csv')
