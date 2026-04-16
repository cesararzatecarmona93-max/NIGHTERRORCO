# CMakeLists.txt for Edge Processing / Fixed-point math / Strict memory optimization

cmake_minimum_required(VERSION 3.22.1)

project("llamadroid")

add_library(
        llamadroid
        SHARED
        native-lib.cpp)

find_library(
        log-lib
        log)

target_link_libraries(
        llamadroid
        ${log-lib})
