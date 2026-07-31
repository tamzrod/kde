# HelixCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.335407Z
**Run ID**: RUN-032
**Seed**: 1700000032

---

## Architecture

- Architecture: hierarchical
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: linked_list
- Commit Method: quorum_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: leader_change

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: timing

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 342ms
- Election Timeout Base: 479ms
- Election Timeout Range: 214ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce

## State Machine

- Type: fsm
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- voting:hierarchical_quorum
- vote_granting:grant_to_highest_term
- log:command_log
- log_structure:linked_list
- commit:quorum_commit
- recovery:state_transfer
- snapshot:leader_change
- dynamic_membership:add_node
- failure_detection:swim_like
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 60
- Elections Succeeded: 40
- Election Success Rate: 66.67%
- Messages Sent: 165
- Commits: 13
- Avg Messages/Commit: 12.69
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 65
- Elections Succeeded: 50
- Election Success Rate: 76.92%
- Messages Sent: 241
- Commits: 14
- Avg Messages/Commit: 17.21
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 62
- Elections Succeeded: 41
- Election Success Rate: 66.13%
- Messages Sent: 264
- Commits: 18
- Avg Messages/Commit: 14.67
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 44
- Elections Succeeded: 44
- Election Success Rate: 100.00%
- Messages Sent: 434
- Commits: 23
- Avg Messages/Commit: 18.87
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

