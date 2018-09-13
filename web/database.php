<?php

class Database {
	var $conn;

	public function connect() {
		$this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

		if ($this->conn->connect_error) {
		    return false;
		}

		$this->conn->query('SET NAMES utf8');
		return true;
	}

	public function select($query) {
		if (!$this->connect()) return false;

		$return = array();
		$result = $this->conn->query($query);

		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				array_push($return, $row);
			}
		}

		$this->conn->close();

		return $return;
	}
}
