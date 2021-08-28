import cv2
 
cap = cv2.VideoCapture('hotwheels.mp4')
 
car_cascade = cv2.CascadeClassifier('cars.xml')

def draw(points):
    for point in points:
        cv2.circle(imgResult, (point[0], point[1]), 1, (0,0,255), cv2.FILLED)

points = []

while True:
    ret, frames = cap.read()
    imgResult = frames.copy()



    gray = cv2.cvtColor(frames, cv2.COLOR_BGR2GRAY)
     
 
    cars = car_cascade.detectMultiScale(gray, 1.1, 1)
     
    for (x,y,w,h) in cars:
        cv2.rectangle(frames,(x,y),(x+w,y+h),(0,0,255),2)
        midPointX = (x + x + w) // 2
        midPointY = (y + y + h) // 2

        for newPoint in [[midPointX,midPointY]]:
            points.append(newPoint)
        if len(points)!= 0:
            draw(points)

    cv2.imshow('video2', frames)
    cv2.imshow('video3', imgResult)

     
    if cv2.waitKey(33) == 27:
        break
 
cv2.destroyAllWindows()
