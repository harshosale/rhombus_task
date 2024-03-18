import pandas as pd
import warnings

warnings.simplefilter(action="ignore", category=FutureWarning)


def process_csv(filename):
    data = TryConverter(filename)
    ans = []

    for x, y in zip(data.df.columns, data.df.dtypes):
        ans.append([str(x), str(y)])

    data.infer_and_convert_data_types()

    for ind, new_types in enumerate(data.df.dtypes):
        ans[ind].append(str(new_types))

    return ans


class TryConverter:
    def __init__(self, filename):
        self.df = pd.read_csv(filename)

    def infer_and_convert_data_types(self):
        for col in self.df.columns:
            for method in [self.try_datetime, self.try_categorical, self.try_numeric]:
                if method(col):
                    break

    def try_numeric(self, col):
        df_converted = pd.to_numeric(self.df[col], errors="ignore", downcast="integer")
        if not df_converted.isna().all():
            self.df[col] = df_converted
            return True
        else:
            return False

    def try_datetime_helper(self, col, format):
        try:
            self.df[col] = pd.to_datetime(self.df[col], format=format)
            return True
        except:
            return False

    def try_datetime(self, col):
        for format in [
            "%d/%m/%Y",
            "%m/%d/%Y",
            "%Y/%m/%d",
            "%d-%m-%Y",
            "%m-%d-%Y",
            "%Y-%m-%d",
        ]:
            if self.try_datetime_helper(col, format):
                return True
        return False

    def try_categorical(self, col):
        col_count = len(self.df[col])
        uniq_col_count = len(self.df[col].unique())
        if (uniq_col_count / col_count) < 0.5:
            self.df[col] = pd.Categorical(self.df[col])
            return True
        else:
            return False
