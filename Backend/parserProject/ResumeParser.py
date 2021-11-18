from resume_parser import resumeparse

def parse(file):
    print('******************************')
    data = resumeparse.read_file(file)
    return data
